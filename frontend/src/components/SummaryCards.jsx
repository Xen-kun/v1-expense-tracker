import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";

function SummaryCards() {
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

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonth = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );
        })
        .reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );

    const totalTransactions = expenses.length;

    return (
        <div className="grid grid-cols-3 gap-3">
            {/* Total Expenses */}
            <div
                className="rounded-2xl border p-4"
                style={{
                    background: "#0b1223",
                    borderColor: "#1a2847",
                }}
            >
                <p
                    className="text-xs mb-2"
                    style={{ color: "#64748b" }}
                >
                    Total Expenses
                </p>

                <p
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "DM Mono, monospace" }}
                >
                    ₱{totalExpenses.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>

            {/* This Month */}
            <div
                className="rounded-2xl border p-4"
                style={{
                    background: "#0b1223",
                    borderColor: "#1a2847",
                }}
            >
                <p
                    className="text-xs mb-2"
                    style={{ color: "#64748b" }}
                >
                    This Month
                </p>

                <p
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "DM Mono, monospace" }}
                >
                    ₱{thisMonth.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>

            {/* Transactions */}
            <div
                className="rounded-2xl border p-4"
                style={{
                    background: "#0b1223",
                    borderColor: "#1a2847",
                }}
            >
                <p
                    className="text-xs mb-2"
                    style={{ color: "#64748b" }}
                >
                    Total Transactions
                </p>

                <p
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "DM Mono, monospace" }}
                >
                    {totalTransactions}
                </p>
            </div>
        </div>
    );
}

export default SummaryCards;