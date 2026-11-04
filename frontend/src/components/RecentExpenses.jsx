import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";

const RecentExpenses = ({ setActiveTab }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadExpenses();
  }, []);

  const recentExpenses = expenses.slice(0, 5);

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">
          Recent Expenses
        </h2>

        <button
          type="button"
          onClick={() => setActiveTab("expenses")}
          className="text-xs font-semibold cursor-pointer"
          style={{ color: "#a78bfa" }}
        >
          View all →
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "#0b1223",
          borderColor: "#1a2847",
        }}
      >
        {recentExpenses.map((expense, index) => (
          <div
            key={expense.id}
            className="flex items-center justify-between px-4 py-4"
            style={{
              borderBottom:
                index !== recentExpenses.length - 1
                  ? "1px solid #1a2847"
                  : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {expense.category === "Food" && "🍜"}
                {expense.category === "Transportation" && "🚌"}
                {expense.category === "Shopping" && "🛍️"}
                {expense.category === "Bills" && "📋"}
                {expense.category === "Entertainment" && "🎬"}
                {expense.category === "Health" && "💊"}
                {expense.category === "Other" && "📌"}
              </span>

              <div>
                <h3 className="text-sm font-medium text-white">
                  {expense.title}
                </h3>

                <p
                  className="text-xs mt-1"
                  style={{ color: "#64748b" }}
                >
                  {expense.category} ·{" "}
                  {new Date(expense.date).toLocaleDateString("en-CA")}
                </p>
              </div>
            </div>

            <span
              className="text-sm font-semibold text-white"
              style={{
                fontFamily: "DM Mono, monospace",
              }}
            >
              -₱{Number(expense.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentExpenses;