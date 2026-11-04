function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        {/* Logo */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #6366f1)",
          }}
        >
          💸
        </div>

        {/* App Name */}
        <h1 className="text-xl font-semibold text-white tracking-tight">
          GastoMo
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="text-xs pl-11"
        style={{
          color: "#475569",
          fontFamily: "DM Mono, monospace",
        }}
      >
        Philippine Peso Expense Tracker
      </p>
    </header>
  );
}

export default Header;