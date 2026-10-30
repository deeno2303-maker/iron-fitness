const express = require("express");
const pool = require("../db");
const getStripe = require("../stripeClient");

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe webhook keys are not configured.");
    return res.status(500).json({ error: "Webhook is not configured." });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Stripe webhook signature verification failed: ${err.message}`);
    return res.status(400).json({ error: "Invalid Stripe webhook signature." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.mode === "subscription" && session.payment_status === "paid") {
      const orderId = session.metadata && session.metadata.orderId;
      if (!orderId) {
        console.error(`Stripe session ${session.id} has no order metadata.`);
        return res.status(400).json({ error: "Checkout session has no order reference." });
      }

      try {
        const result = await pool.query(
          `UPDATE orders
           SET status = 'paid', stripe_subscription_id = $1, paid_at = NOW()
           WHERE id = $2 AND stripe_checkout_session_id = $3 AND status = 'pending'`,
          [session.subscription, orderId, session.id]
        );
        if (result.rowCount === 0) {
          const existing = await pool.query(
            "SELECT status FROM orders WHERE id = $1 AND stripe_checkout_session_id = $2",
            [orderId, session.id]
          );
          if (existing.rows[0]?.status !== "paid") {
            console.error(`No pending order matched completed Stripe session ${session.id}.`);
          }
        }
      } catch (err) {
        console.error(`Could not record payment for Stripe session ${session.id}: ${err.message}`);
        return res.status(500).json({ error: "Could not record payment." });
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;
