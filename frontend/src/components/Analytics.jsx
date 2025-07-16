"use client"

import { motion } from "framer-motion"
import Charts from "./Charts"
import SpendingTrends from "./SpendingTrends"

export default function Analytics({ transactions, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0)

  const categoryData = Object.entries(expensesByCategory).map(([category, amount], index) => ({
    category,
    amount,
    percentage: totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0,
    color: colors[index % colors.length],
  }))

  return (
    <div className="p-4 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Insights into your financial patterns</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <Charts transactions={transactions} />
          <SpendingTrends transactions={transactions} />
        </div>
      </motion.div>
    </div>
  )
}
