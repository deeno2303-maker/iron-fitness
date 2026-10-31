const express = require("express");
const pool = require("../db");
const getStripe = require("../stripeClient");

const router = express.Router();

function getOrderReference(session) {
  const orderId = session.metadata?.orderId;
  const userId = session.metadata?.userId;

  if (
    typeof orderId !== "string" ||
    !/^[1-9]\d*$/.test(orderId) ||
    typeof userId !== "string" ||
    !/^[1-9]\d*$/.test(userId) ||
    session.client_reference_id !== orderId
  ) {
    return null;
  }

  return { orderId, userId };
}

async function recordOrderStatus(session, status, subscriptionId = null) {
  const reference = getOrderReference(session);
  if (!reference) {
    console.error(`Stripe session ${session.id} has invalid order metadata.`);
    return { error: "Checkout session has no valid order reference.", statusCode: 400 };
  }

  const result = await pool.query(
    `UPDATE orders
     SET stripe_checkout_session_id = $1,
         status = $2,
         stripe_subscription_id = COALESCE($3, stripe_subscription_id),
         paid_at = CASE WHEN $2 = 'paid' THEN COALESCE(paid_at, NOW()) ELSE paid_at END
     WHERE id = $4
       AND user_id = $5
       AND status = 'pending'
       AND (stripe_checkout_session_id IS NULL OR stripe_checkout_session_id = $1)`,
    [session.id, status, subscriptionId, reference.orderId, reference.userId]
  );
  if (result.rowCount > 0) return { updated: true };

  const existing = await pool.query(
    `SELECT status, stripe_checkout_session_id
     FROM orders
     WHERE id = $1 AND user_id = $2`,
    [reference.orderId, reference.userId]
  );
  const order = existing.rows[0];
  if (order?.status === status && order.stripe_checkout_session_id === session.id) {
    return { updated: false };
  }

  console.error(
    `No pending order matched ${status} Stripe session ${session.id}; the event will be retried.`
  );
  return { error: "Could not match the Stripe session to a pending order.", statusCode: 500 };
}

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

  const session = event.data.object;
  let orderStatus;
  let subscriptionId = null;
  if (
    event.type === "checkout.session.completed" &&
    session.mode === "subscription" &&
    session.payment_status === "paid"
  ) {
    orderStatus = "paid";
    subscriptionId = typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id || null;
  } else if (event.type === "checkout.session.expired" && session.mode === "subscription") {
    orderStatus = "checkout_failed";
  }

  if (orderStatus) {
    try {
      const result = await recordOrderStatus(session, orderStatus, subscriptionId);
      if (result.error) return res.status(result.statusCode).json({ error: result.error });
    } catch (err) {
      console.error(`Could not record ${orderStatus} for Stripe session ${session.id}: ${err.message}`);
      return res.status(500).json({ error: "Could not record the checkout status." });
    }
  }

  res.json({ received: true });
});

module.exports = router;
