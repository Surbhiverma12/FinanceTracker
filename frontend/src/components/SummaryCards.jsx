"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { useCurrency } from "../CurrencyContext";

export default function SummaryCards({ totalIncome, totalExpenses, balance, transactions }) {

  const { formatCurrency } = useCurrency();
  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: DollarSign,
      color: balance >= 0 ? "emerald" : "red",
      change: "+2.5%",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      color: "emerald",
      change: "+12.3%",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      color: "red",
      change: "-5.2%",
    },
    {
      title: "Transactions",
      value: transactions.length,
      icon: CreditCard,
      color: "blue",
      change: "+8 this month",
      isCount: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${card.color}-100`}>
                <Icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <span className={`text-sm font-medium text-${card.color}-600`}>{card.change}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {card.isCount ? card.value : formatCurrency(card.value)}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
