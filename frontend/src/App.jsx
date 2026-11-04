import { useState } from "react";
//import components and pages
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense";
import Header from "./components/Header";

function App() {
  //define state for active tab and set default to "dashboard"
  const [activeTab, setActiveTab] = useState("dashboard");

  // Helper function to handle the conditional rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'add-expense':
        return <AddExpense />;
      case 'expenses':
        return <Expenses />;
      default:
        return <Dashboard />; // Fallback in case of an unknown tab
    }
  };

  return (
    <div className="min-h-screen bg-[#060b18]">
      <div className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <Header />
        {renderTabContent()}
      </div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;
