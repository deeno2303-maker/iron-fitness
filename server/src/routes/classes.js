// GET /api/classes            -> all classes
// GET /api/classes?type=Strength -> filtered by category
const express = require("express");
const pool = require("../db");

const router = express.Router();
const DAY_ORDER = "ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun']";

router.get("/", async (req, res, next) => {
  try {
    const { type } = req.query;
    let sql = "SELECT id, day, time, name, type FROM classes";
    const params = [];
    if (type && type !== "All") {
      sql += " WHERE type = $1";
      params.push(type);
    }
    sql += ` ORDER BY array_position(${DAY_ORDER}, day), time`;
    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
