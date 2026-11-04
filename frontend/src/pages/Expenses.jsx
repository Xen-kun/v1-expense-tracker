
import { useEffect, useState } from "react";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseList from "../components/ExpenseList";
import { getExpenses, deleteExpense, updateExpense} from "../services/expenseService";

const categories = [
    "Food",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
];

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingExpense, setEditingExpense] = useState(null);
    const [deletingExpense, setDeletingExpense] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);

            setExpenses((currentExpenses) =>
                currentExpenses.filter((expense) => expense.id !== id)
            );

            setDeletingExpense(null);
        } catch (error) {
            console.error("Delete error:", error);
            alert(error.message);
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense({
            ...expense,
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: String(expense.date).slice(0, 10),
        });
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (!editingExpense) return;

        setIsSaving(true);

        try {
            const updatedExpense = await updateExpense(
                editingExpense.id,
                {
                    title: editingExpense.title,
                    amount: editingExpense.amount,
                    category: editingExpense.category,
                    date: editingExpense.date,
                }
            );

            setExpenses((currentExpenses) =>
                currentExpenses.map((expense) =>
                    expense.id === editingExpense.id
                        ? { ...expense, ...updatedExpense }
                        : expense
                )
            );

            setEditingExpense(null);
        } catch (error) {
            console.error("Update error:", error);
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRequestDelete = (expense) => {
        setDeletingExpense(expense);
    };

    const filteredExpenses =
        selectedCategory === "all"
            ? expenses
            : expenses.filter(
                (expense) => expense.category === selectedCategory
            );

    return (
        <main className="mt-2">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Expenses List
                </h2>

                <p
                    className="mt-1 text-xs"
                    style={{
                        color: "#475569",
                        fontFamily: "DM Mono, monospace",
                    }}
                >
                    All your recorded expenses
                </p>
            </div>

            <ExpenseFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleRequestDelete}
                onEdit={handleEdit}
            />

            {/* Edit Expense Modal */}
            {editingExpense && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    // onClick={() => setEditingExpense(null)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
                        style={{
                            background: "#0b1223",
                            borderColor: "#263454",
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">
                                Edit Expense
                            </h2>

                            <button
                                type="button"
                                onClick={() => setEditingExpense(null)}
                                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                                aria-label="Close edit popup"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={100}
                                    value={editingExpense.title}
                                    onChange={(event) =>
                                        setEditingExpense({
                                            ...editingExpense,
                                            title: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border p-3 text-sm text-white outline-none focus:border-violet-500"
                                    style={{
                                        background: "#111c35",
                                        borderColor: "#263454",
                                    }}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Amount (₱)
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0.01"
                                    step="0.01"
                                    value={editingExpense.amount}
                                    onChange={(event) =>
                                        setEditingExpense({
                                            ...editingExpense,
                                            amount: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border p-3 text-sm text-white outline-none focus:border-violet-500"
                                    style={{
                                        background: "#111c35",
                                        borderColor: "#263454",
                                    }}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Category
                                </label>
                                <select
                                    required
                                    value={editingExpense.category}
                                    onChange={(event) =>
                                        setEditingExpense({
                                            ...editingExpense,
                                            category: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border p-3 text-sm text-white outline-none focus:border-violet-500"
                                    style={{
                                        background: "#111c35",
                                        borderColor: "#263454",
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={editingExpense.date}
                                    onChange={(event) =>
                                        setEditingExpense({
                                            ...editingExpense,
                                            date: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border p-3 text-sm text-white outline-none focus:border-violet-500"
                                    style={{
                                        background: "#111c35",
                                        borderColor: "#263454",
                                        colorScheme: "dark",
                                    }}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingExpense(null)}
                                    className="flex-1 cursor-pointer rounded-lg border p-3 text-sm text-slate-300 hover:bg-slate-800"
                                    style={{ borderColor: "#263454" }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 cursor-pointer rounded-lg bg-violet-600 p-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Expense Modal */}
            {deletingExpense && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                >
                    <div
                        className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
                        style={{
                            background: "#0b1223",
                            borderColor: "#263454",
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >

                        <div className="mb-6">
                            {/* Heading */}
                            <h2>Delete Expense?</h2>

                            {/* Confirmation message */}
                            <p>Are you sure you want to delete this expense?</p>

                            {/* Expense details */}
                            <h3 className="mt-4 font-semibold text-white">
                                "{deletingExpense.title}"
                            </h3>

                            <h3 className="mt-1 text-sm text-slate-400">
                                ₱{Number(deletingExpense.amount).toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </h3>
                        </div>

                        {/* Cancel and Delete buttons */}
                        <div className="flex gap-3">
                            {/* Cancel button */}
                            <button
                                type = "button"
                                onClick={() => setDeletingExpense(null)}
                                className="flex-1 cursor-pointer rounded-lg border p-3 text-sm text-slate-300 hover:bg-slate-800"
                                style={{ borderColor: "#263454" }}
                            >
                                Cancel
                            </button>

                            {/* Delete button */}
                            <button
                                type="button"
                                onClick={() => handleDelete(deletingExpense.id)}
                                className="flex-1 cursor-pointer rounded-lg bg-red-600 p-3 text-sm font-semibold text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Expenses;
