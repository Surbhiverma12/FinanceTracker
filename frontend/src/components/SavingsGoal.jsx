"use client"

import { motion } from "framer-motion"
import { Target, TrendingUp } from "lucide-react"

export default function SavingsGoal({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const currentSavings = totalIncome - totalExpenses

  // Mock savings goal - in real app this would come from user settings
  const savingsGoal = 10000
  const progress = Math.max(0, Math.min(100, (currentSavings / savingsGoal) * 100))
  const remaining = Math.max(0, savingsGoal - currentSavings)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const monthsToGoal =
    currentSavings > 0 && totalIncome > totalExpenses ? Math.ceil(remaining / (totalIncome - totalExpenses)) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Savings Goal</h3>
          <p className="text-sm text-gray-500">{formatCurrency(savingsGoal)} target</p>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-gray-200"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className="text-emerald-500"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">{progress.toFixed(0)}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
          <span className="text-sm font-medium text-emerald-700">Current Savings</span>
          <span className="font-bold text-emerald-600">{formatCurrency(Math.max(0, currentSavings))}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Remaining</span>
          <span className="font-bold text-gray-600">{formatCurrency(remaining)}</span>
        </div>

        {monthsToGoal > 0 && monthsToGoal < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center p-3 bg-blue-50 rounded-lg"
          >
            <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-700">
              <span className="font-semibold">{monthsToGoal}</span> months to goal
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
