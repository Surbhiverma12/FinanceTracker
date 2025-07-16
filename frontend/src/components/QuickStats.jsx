"use client"

import { motion } from "framer-motion"
import { PieChart } from "lucide-react"

export default function QuickStats({ transactions }) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {})

  const topCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {topCategories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expenses yet</p>
        ) : (
          topCategories.map(([category, amount], index) => {
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-500">${amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-500">{percentage.toFixed(1)}% of total expenses</div>
              </motion.div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}
