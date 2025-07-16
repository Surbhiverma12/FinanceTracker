"use client"

import { motion } from "framer-motion"
import { PieChart } from "lucide-react"

export default function Charts({ transactions }) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {})

  const chartData = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0)

  const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-yellow-500", "bg-red-500", "bg-indigo-500"]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No expense data available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {chartData.map(([category, amount], index) => {
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                    <span className="font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-3 rounded-full ${colors[index % colors.length]}`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
