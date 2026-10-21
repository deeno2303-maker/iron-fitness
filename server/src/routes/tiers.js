// GET /api/tiers
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price, featured, perks FROM membership_tiers ORDER BY sort_order"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
