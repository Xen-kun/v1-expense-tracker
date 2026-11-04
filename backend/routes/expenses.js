
const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY date DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// POST a new expense
router.post("/", async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO expenses (title, amount, category, date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, amount, category, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// DELETE an expense by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
      expense: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});

// PUT (update) an expense by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE expenses
             SET title = $1, amount = $2, category = $3, date = $4
             WHERE id = $5
             RETURNING *`,
      [title, amount, category, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      message: "Failed to update expense",
    });
  }
});


module.exports = router;