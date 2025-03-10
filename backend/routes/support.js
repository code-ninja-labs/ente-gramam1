const express = require("express");
const pool = require("../database");
const router = express.Router();

// Route to get all support requests
router.get("/support", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM support_requests ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to create a support request
router.post("/support", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const result = await pool.query(
      "INSERT INTO support_requests (name, email, message, created_at) VALUES ($1,$2, $
3, NOW()) RETURNING *",
      [name, email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
