const { Pool } = require("pg");

// Initialize the pool with Neon credentials
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Uses DATABASE_URL from .env
  ssl: {
    rejectUnauthorized: false, // Important for Neon
  },
});

module.exports = pool;
