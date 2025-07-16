"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "./Header"
import MobileNav from "./MobileNav"
import Dashboard from "./Dashboard"
import AddTransaction from "./AddTransaction"
import Transactions from "./Transactions"
import Analytics from "./Analytics"
import Settings from "./Settings"

export default function MainApp({ user, onLogout, showToast }) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockTransactions = [
        {
          id: 1,
          type: "income",
          category: "Salary",
          amount: 5000,
          date: "2024-01-15",
          note: "Monthly salary",
        },
        {
          id: 2,
          type: "expense",
          category: "Food",
          amount: 150,
          date: "2024-01-14",
          note: "Grocery shopping",
        },
        {
          id: 3,
          type: "expense",
          category: "Transportation",
          amount: 50,
          date: "2024-01-13",
          note: "Gas for car",
        },
        {
          id: 4,
          type: "income",
          category: "Freelance",
          amount: 800,
          date: "2024-01-12",
          note: "Web development project",
        },
        {
          id: 5,
          type: "expense",
          category: "Entertainment",
          amount: 75,
          date: "2024-01-11",
          note: "Movie tickets",
        },
        {
          id: 6,
          type: "expense",
          category: "Bills",
          amount: 200,
          date: "2024-01-10",
          note: "Electricity bill",
        },
      ]

      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    loadTransactions()
  }, [])

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    }
    setTransactions((prev) => [transaction, ...prev])
    showToast("success", "Transaction added successfully!")
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    showToast("success", "Transaction deleted successfully!")
  }

  const renderPage = () => {
    const pageProps = {
      transactions,
      isLoading,
      onAddTransaction: addTransaction,
      onDeleteTransaction: deleteTransaction,
      user,
      showToast,
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard {...pageProps} />
      case "add":
        return <AddTransaction {...pageProps} />
      case "transactions":
        return <Transactions {...pageProps} />
      case "analytics":
        return <Analytics {...pageProps} />
      case "settings":
        return <Settings {...pageProps} />
      default:
        return <Dashboard {...pageProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={onLogout}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        transactions={transactions}
      />

      <MobileNav
        isOpen={isMobileMenuOpen}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page)
          setIsMobileMenuOpen(false)
        }}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="pt-16">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </main>
    </div>
  )
}
