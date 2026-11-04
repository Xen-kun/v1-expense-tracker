const express = require("express");
const pool = require("./db");
const expenseRoutes = require("./routes/expenses");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("PostgreSQL connection failed:", err);
  } else {
    console.log("PostgreSQL connected:", result.rows[0]);
  }
});

app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});