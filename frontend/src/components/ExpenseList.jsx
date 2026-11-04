const ExpenseList = ({ expenses, onDelete , onEdit }) => {
    const getCategoryIcon = (category) => {
        switch (category) {
            case "Food":
                return "🍜";
            case "Transportation":
                return "🚌";
            case "Shopping":
                return "🛍️";
            case "Bills":
                return "📋";
            case "Entertainment":
                return "🎬";
            case "Health":
                return "💊";
            default:
                return "📌";
        }
    };

    if (expenses.length === 0) {
        return (
            <div
                className="rounded-2xl border p-8 text-center"
                style={{
                    background: "#0b1223",
                    borderColor: "#1a2847",
                }}
            >
                <p className="text-sm text-slate-500">
                    No expenses found.
                </p>
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl border overflow-hidden"
            style={{
                background: "#0b1223",
                borderColor: "#1a2847",
            }}
        >
            {expenses.map((expense, index) => (
                <div
                    key={expense.id}
                    className="flex items-center justify-between px-4 py-4"

                >
                    {/* Expense information */}
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg">
                            {getCategoryIcon(expense.category)}
                        </span>

                        <div className="min-w-0">
                            <h3 className="text-sm font-medium text-white truncate">
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

                    {/* Amount */}
                    <span
                        className="text-sm font-semibold text-white ml-4"
                        style={{
                            fontFamily: "DM Mono, monospace",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="text-sm font-semibold text-white"
                                style={{ fontFamily: "DM Mono, monospace" }}
                            >
                                -₱{Number(expense.amount).toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                                
                                {/* Edit Button */}
                                <button
                                    type="button"
                                    onClick={() => onEdit(expense)}
                                    className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-violet-500/10"
                                    title="Edit expense"
                                    aria-label={`Edit ${expense.title}`}
                                >
                                    ✏️
                                </button>
                            </span>

                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={() => onDelete(expense)}
                                className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-red-500/10"
                                title="Delete expense"
                                aria-label={`Delete ${expense.title}`}
                            >
                                🗑️
                            </button>
                        </div>
                    </span>
                    
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;