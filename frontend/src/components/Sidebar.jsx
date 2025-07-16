"use client"

import { motion } from "framer-motion"
import { Home, Plus, Receipt, BarChart3, Settings, LogOut, Wallet, TrendingUp, TrendingDown, User } from "lucide-react"

export default function Sidebar({ user, currentPage, onPageChange, onLogout, transactions }) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Overview & summary",
    },
    {
      id: "add",
      label: "Add Transaction",
      icon: Plus,
      description: "New income/expense",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: Receipt,
      description: "Full history",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Charts & insights",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Account & preferences",
    },
  ]

  return (
    <div className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinanceTracker</h1>
            <p className="text-sm text-gray-500">Personal Finance</p>
          </div>
        </div>

        {/* Quick Balance */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Current Balance</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {formatCurrency(balance)}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center space-x-1 text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>{formatCurrency(totalIncome)}</span>
            </div>
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingDown className="w-3 h-3" />
              <span>{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                currentPage === item.id
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentPage === item.id ? "text-emerald-600" : "text-gray-400"}`} />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  )
}
