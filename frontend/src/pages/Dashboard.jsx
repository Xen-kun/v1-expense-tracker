import React from 'react'
import SummaryCards from "../components/SummaryCards";
import RecentExpenses from "../components/RecentExpenses";

const Dashboard = ({ setActiveTab}) => {
  return (
    <main>
        <SummaryCards />
        <RecentExpenses setActiveTab={setActiveTab} />
    </main>
  )
}

export default Dashboard