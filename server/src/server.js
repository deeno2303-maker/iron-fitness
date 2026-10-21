// Main Express server entry point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/classes");
const trainerRoutes = require("./routes/trainers");
const tierRoutes = require("./routes/tiers");
const interestRoutes = require("./routes/interests");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend (Vercel URL or localhost) to call this API
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools like curl/Postman (no origin) and listed origins
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// Health check — proves the API is live and the DB is reachable
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Ironhouse Fitness API. Try /api/classes" });
});

app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/tiers", tierRoutes);
app.use("/api/interests", interestRoutes);

// 404 for unknown API routes
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Ironhouse API running on port ${PORT}`);
});
