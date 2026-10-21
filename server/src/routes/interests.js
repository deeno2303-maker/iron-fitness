// Signed-in member's saved classes
// GET  /api/interests         -> ["Mon-06:00", ...]
// POST /api/interests/toggle  -> body { classId }
const express = require("express");
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();
router.use(authenticateToken); // every route here needs a signed-in user

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT class_id FROM user_interests WHERE user_id = $1",
      [req.user.id]
    );
    res.json(result.rows.map((r) => r.class_id));
  } catch (err) {
    next(err);
  }
});

router.post("/toggle", async (req, res, next) => {
  try {
    const { classId } = req.body;
    if (!classId) return res.status(400).json({ error: "classId is required" });

    const removed = await pool.query(
      "DELETE FROM user_interests WHERE user_id = $1 AND class_id = $2 RETURNING class_id",
      [req.user.id, classId]
    );

    if (removed.rows.length > 0) return res.json({ classId, interested: false });

    await pool.query(
      "INSERT INTO user_interests (user_id, class_id) VALUES ($1, $2)",
      [req.user.id, classId]
    );
    res.json({ classId, interested: true });
  } catch (err) {
    if (err.code === "23503") return res.status(404).json({ error: "Class not found" });
    next(err);
  }
});

module.exports = router;
