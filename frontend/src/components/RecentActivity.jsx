"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

export default function RecentActivity({ transactions }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet</p>
        ) : (
          transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income" ? "bg-emerald-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{transaction.note || "No description"}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
