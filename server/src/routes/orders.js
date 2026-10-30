const express = require("express");
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();
router.use(authenticateToken);

router.get("/session/:sessionId", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.status, o.total_amount AS "totalAmount",
              o.currency, o.created_at AS "createdAt",
              oi.product_name AS "productName", oi.quantity
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       WHERE o.stripe_checkout_session_id = $1 AND o.user_id = $2`,
      [req.params.sessionId, req.user.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: "Order not found." });
    res.json({ order: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
