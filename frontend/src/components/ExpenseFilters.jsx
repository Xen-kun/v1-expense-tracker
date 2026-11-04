
const categories = [
    { name: "all", label: "All", icon: "" },
    { name: "Food", label: "Food", icon: "🍜" },
    { name: "Transportation", label: "Transport", icon: "🚌" },
    { name: "Shopping", label: "Shopping", icon: "🛍️" },
    { name: "Health", label: "Health", icon: "💊" },
    { name: "Entertainment", label: "Entertainment", icon: "🎬" },
    { name: "Bills", label: "Bills", icon: "📋" },
    { name: "Other", label: "Other", icon: "📌" },
];

const ExpenseFilters = ({
    selectedCategory,
    onCategoryChange,
}) => {
    return (
        <div className="card mb-4">
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.name;

                    return (
                        <button
                            key={category.name}
                            type="button"
                            onClick={() => onCategoryChange(category.name)}
                            className="rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer"
                            style={{
                                background: isSelected
                                    ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                                    : "#111c35",
                                borderColor: isSelected ? "#7c3aed" : "#1a2847",
                                color: "#fff",
                            }}
                        >
                            {category.icon && `${category.icon} `}
                            {category.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ExpenseFilters;
