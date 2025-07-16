"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Target, AlertTriangle } from "lucide-react"

export default function FinancialHealth({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Calculate financial health metrics
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  // Determine health score (0-100)
  let healthScore = 0
  if (savingsRate >= 20) healthScore += 40
  else if (savingsRate >= 10) healthScore += 25
  else if (savingsRate >= 0) healthScore += 10

  if (expenseRatio <= 50) healthScore += 30
  else if (expenseRatio <= 70) healthScore += 20
  else if (expenseRatio <= 90) healthScore += 10

  if (balance > 1000) healthScore += 30
  else if (balance > 0) healthScore += 20
  else if (balance > -500) healthScore += 10

  const getHealthStatus = (score) => {
    if (score >= 80) return { status: "Excellent", color: "emerald", icon: Heart }
    if (score >= 60) return { status: "Good", color: "blue", icon: Shield }
    if (score >= 40) return { status: "Fair", color: "yellow", icon: Target }
    return { status: "Needs Attention", color: "red", icon: AlertTriangle }
  }

  const health = getHealthStatus(healthScore)

  const metrics = [
    {
      label: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      target: "20%+",
      status: savingsRate >= 20 ? "good" : savingsRate >= 10 ? "fair" : "poor",
    },
    {
      label: "Expense Ratio",
      value: `${expenseRatio.toFixed(1)}%`,
      target: "<70%",
      status: expenseRatio <= 70 ? "good" : expenseRatio <= 90 ? "fair" : "poor",
    },
    {
      label: "Current Balance",
      value: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(balance),
      target: "$1000+",
      status: balance >= 1000 ? "good" : balance >= 0 ? "fair" : "poor",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`w-10 h-10 bg-gradient-to-r from-${health.color}-500 to-${health.color}-600 rounded-full flex items-center justify-center`}
        >
          <health.icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Financial Health</h3>
          <p className="text-sm text-gray-500">Overall score: {healthScore}/100</p>
        </div>
      </div>

      {/* Health Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={`text-${health.color}-500`}
              strokeDasharray={`${2 * Math.PI * 50}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - healthScore / 100) }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold text-${health.color}-600`}>{healthScore}</div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`text-center mb-6 p-3 rounded-lg bg-${health.color}-50`}>
        <p className={`font-semibold text-${health.color}-700`}>{health.status}</p>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-700">{metric.label}</p>
              <p className="text-xs text-gray-500">Target: {metric.target}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{metric.value}</p>
              <div
                className={`w-2 h-2 rounded-full ${
                  metric.status === "good"
                    ? "bg-emerald-500"
                    : metric.status === "fair"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
