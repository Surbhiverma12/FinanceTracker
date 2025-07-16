"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export default function SpendingTrends({ transactions }) {
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 }
    }
    if (transaction.type === "income") {
      acc[month].income += transaction.amount
    } else {
      acc[month].expenses += transaction.amount
    }
    return acc
  }, {})

  const chartData = Object.entries(monthlyData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-6)

  const maxAmount = Math.max(...chartData.flatMap(([, data]) => [data.income, data.expenses]))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No trend data available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {chartData.map(([month, data], index) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{month}</span>
                <div className="text-sm text-gray-500">Net: ${(data.income - data.expenses).toFixed(2)}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-600">Income</span>
                  <span className="font-medium">${data.income.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${maxAmount > 0 ? (data.income / maxAmount) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600">Expenses</span>
                  <span className="font-medium">${data.expenses.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${maxAmount > 0 ? (data.expenses / maxAmount) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-red-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
