"use client"

import { motion } from "framer-motion"
import SummaryCards from "../SummaryCards"
import RecentActivity from "../RecentActivity"
import QuickStats from "../QuickStats"
import FinancialHealth from "../FinancialHealth"

export default function Dashboard({ transactions, isLoading }) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Your financial overview at a glance</p>
      </motion.div>

      <div className="space-y-8">
        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <RecentActivity transactions={transactions.slice(0, 8)} />
          </div>
          <div className="space-y-8">
            <QuickStats transactions={transactions} />
            <FinancialHealth transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}
