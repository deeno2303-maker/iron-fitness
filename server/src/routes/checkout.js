const express = require("express");
const pool = require("../db");
const authenticateToken = require("../middleware/auth");
const getStripe = require("../stripeClient");

const router = express.Router();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

function priceInCents(price) {
  const match = /^R\s*(\d+)(?:\.(\d{1,2}))?$/.exec(price);
  if (!match) return null;

  const cents = Number(match[1]) * 100 + Number((match[2] || "").padEnd(2, "0"));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null;
}

function getReturnUrl(value, checkoutState) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (
    !allowedOrigins.includes(url.origin) ||
    (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost"))
  ) {
    return null;
  }

  url.search = "";
  url.hash = "";
  url.searchParams.set("checkout", checkoutState);
  if (checkoutState === "success") {
    return `${url.toString()}&session_id={CHECKOUT_SESSION_ID}`;
  }
  return url.toString();
}

router.post("/", authenticateToken, async (req, res, next) => {
  const { tierId, returnUrl } = req.body || {};
  if (typeof tierId !== "string" || !tierId.trim()) {
    return res.status(400).json({ error: "Choose a membership tier." });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: "Stripe Checkout is not configured." });
  }

  const successUrl = getReturnUrl(returnUrl, "success");
  const cancelUrl = getReturnUrl(returnUrl, "cancelled");
  if (!successUrl || !cancelUrl) {
    return res.status(400).json({ error: "Checkout return URL is not allowed." });
  }

  try {
    const tierResult = await pool.query(
      "SELECT id, name, price FROM membership_tiers WHERE id = $1",
      [tierId.trim()]
    );
    const tier = tierResult.rows[0];
    if (!tier) return res.status(404).json({ error: "Membership tier not found." });

    const amount = priceInCents(tier.price);
    if (!amount) {
      console.error(`Membership tier ${tier.id} has an invalid database price.`);
      return res.status(500).json({ error: "This membership cannot be purchased right now." });
    }

    const client = await pool.connect();
    let orderId;
    try {
      await client.query("BEGIN");
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, currency)
         VALUES ($1, $2, 'zar')
         RETURNING id`,
        [req.user.id, amount]
      );
      orderId = orderResult.rows[0].id;
      await client.query(
        `INSERT INTO order_items (order_id, tier_id, product_name, quantity, unit_amount, currency)
         VALUES ($1, $2, $3, 1, $4, 'zar')`,
        [orderId, tier.id, `${tier.name} membership (monthly)`, amount]
      );
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK").catch(() => {});
      throw err;
    } finally {
      client.release();
    }

    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          line_items: [
            {
              price_data: {
                currency: "zar",
                product_data: {
                  name: `${tier.name} membership`,
                  description: "Monthly Ironhouse Fitness membership",
                },
                unit_amount: amount,
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
          ],
          client_reference_id: String(orderId),
          metadata: { orderId: String(orderId), userId: String(req.user.id) },
          subscription_data: {
            metadata: { orderId: String(orderId), userId: String(req.user.id) },
          },
          success_url: successUrl,
          cancel_url: cancelUrl,
        },
        { idempotencyKey: `ironhouse-order-${orderId}` }
      );

      await pool.query(
        "UPDATE orders SET stripe_checkout_session_id = $1 WHERE id = $2",
        [session.id, orderId]
      );
      res.status(201).json({ orderId, checkoutUrl: session.url });
    } catch (err) {
      await pool.query(
        "UPDATE orders SET status = 'checkout_failed' WHERE id = $1 AND status = 'pending'",
        [orderId]
      );
      console.error(`Could not create Stripe Checkout for order ${orderId}: ${err.message}`);
      res.status(502).json({ error: "Could not start checkout. Please try again." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
