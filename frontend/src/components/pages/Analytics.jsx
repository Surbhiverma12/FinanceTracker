"use client"

import { motion } from "framer-motion"
import SpendingTrends from "../SpendingTrends"
import Charts from "../Charts"
import FinancialHealth from "../FinancialHealth"
import SavingsGoal from "../SavingsGoal"

export default function Analytics({ transactions }) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Detailed insights and charts for your finances</p>
      </motion.div>

      <div className="space-y-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingTrends transactions={transactions} />
          <FinancialHealth transactions={transactions} />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Charts transactions={transactions} />
          </div>
          <SavingsGoal transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
