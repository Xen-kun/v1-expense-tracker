import { useState } from "react";
import { createExpense } from "../services/expenseService";

const categories = [
    { name: "Food", icon: "🍜" },
    { name: "Transportation", icon: "🚌" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Bills", icon: "📋" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Other", icon: "📌" },
];

const ExpenseForm = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Hide any previous success notification
        setSubmitted(false);

        // Validate category before saving
        if (!title) {
            alert("Please enter a title for the expense.");
            return;
        }

        if (!amount) {
            alert("Please enter an amount for the expense.");
            return;
        }

        if (!category) {
            alert("Please select a category for the expense.");
            return;
        }

        if (!date) {
            alert("Please select a date for the expense.");
            return;
        }

        const expense = {
            title,
            amount,
            category,
            date,
        };

        try {
            const newExpense = await createExpense(expense);

            console.log("Expense created:", newExpense);

            // Show success only after saving succeeds
            setSubmitted(true);

            // Clear the form
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="mt-2">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Add Expense
                </h2>

                <p
                    className="text-xs mt-1"
                    style={{
                        color: "#475569",
                        fontFamily: "DM Mono, monospace",
                    }}
                >
                    Record a new expense
                </p>
            </div>

            {/* Form Card */}
            <div
                className="rounded-2xl border p-5"
                style={{
                    background: "#0b1223",
                    borderColor: "#1a2847",
                }}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-xs font-medium mb-2"
                            style={{ color: "#94a3b8" }}
                        >
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="e.g. Lunch"
                            className="w-full rounded-xl border px-3 py-3 text-sm text-white outline-none"
                            style={{
                                background: "#111c35",
                                borderColor: "#1a2847",
                            }}
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-xs font-medium mb-2"
                            style={{ color: "#94a3b8" }}
                        >
                            Amount
                        </label>

                        <div className="relative">
                            <span
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: "#64748b" }}
                            >
                                ₱
                            </span>

                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                placeholder="0.00"
                                className="w-full rounded-xl border pl-8 pr-3 py-3 text-sm text-white outline-none"
                                style={{
                                    background: "#111c35",
                                    borderColor: "#1a2847",
                                    fontFamily: "DM Mono, monospace",
                                }}
                            />
                        </div>
                    </div>

                    {/* Category */}


                    <div>
                        <label className="block text-sm text-slate-400 mb-2">
                            Category
                        </label>

                        <div className="grid grid-cols-4 gap-2">
                            {categories.map((item) => {
                                const isSelected = category === item.name;

                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => setCategory(item.name)}
                                        className="h-20 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all"
                                        style={{
                                            background: isSelected
                                                ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                                                : "#111c35",
                                            borderColor: isSelected ? "#7c3aed" : "#1a2847",
                                        }}
                                    >
                                        <span className="text-xl">
                                            {item.icon}
                                        </span>

                                        <span className="text-xs font-medium text-white whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label
                            htmlFor="date"
                            className="block text-xs font-medium mb-2"
                            style={{ color: "#94a3b8" }}
                        >
                            Date
                        </label>

                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="w-full rounded-xl border px-3 py-3 text-sm text-white outline-none"
                            style={{
                                background: "#111c35",
                                borderColor: "#1a2847",
                                fontFamily: "DM Mono, monospace",
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                        }}
                    >
                        Add Expense
                    </button>
                </form>

                {submitted && (
                    <div
                        className="mt-4 rounded-xl border p-3 text-sm"
                        style={{
                            background: "#0b2e25",
                            borderColor: "#166534",
                            color: "#86efac",
                        }}
                    >
                        ✅ Expense added successfully!
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExpenseForm;