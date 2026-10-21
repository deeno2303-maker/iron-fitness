// PostgreSQL connection pool using the 'pg' package
require("dotenv").config();
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.warn("WARNING: DATABASE_URL is not set. Add it to server/.env");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

module.exports = pool;
