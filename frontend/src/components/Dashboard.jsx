"use client"

import { motion } from "framer-motion"
import SummaryCards from "./SummaryCards"
import RecentActivity from "./RecentActivity"
import QuickStats from "./QuickStats"

export default function Dashboard({ transactions, isLoading, user }) {
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="p-4 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>

        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          transactions={transactions}
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
          <RecentActivity transactions={transactions.slice(0, 5)} />
          <QuickStats transactions={transactions} />
        </div>
      </motion.div>
    </div>
  )
}
