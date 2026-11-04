function Navbar({ activeTab, setActiveTab }) {
  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      id: "add-expense",
      label: "Add Expense",
      icon: "➕",
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: "📋",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 px-4">
      <nav
        className="flex gap-1 p-1.5 rounded-2xl border"
        style={{
          background: "rgba(11, 18, 35, 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "#1a2847",
        }}
      >
        {navigation.map((item) => {
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
              style={{
                background: active
                  ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                  : "transparent",
                color: active ? "#fff" : "#334155",
              }}
            >
              <span className="text-base leading-none">
                {item.icon}
              </span>

              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;

