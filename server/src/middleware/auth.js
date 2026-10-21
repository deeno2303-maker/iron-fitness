// Verifies the JWT sent as "Authorization: Bearer <token>"
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Not signed in" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expired, please sign in again" });
  }
}

module.exports = authenticateToken;
