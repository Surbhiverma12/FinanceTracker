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
import axios from 'axios'

export default function MainApp({ user, onLogout, showToast }) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true)

      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/api/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response)

      const formatted = response.data.transaction.map(t => ({
        ...t,
        date: formatDate(t.date)
      }))

      setTransactions(formatted)
      setIsLoading(false)
    }

    loadTransactions()
  }, [])

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      date: formatDate(new Date().toISOString()),
    }
    setTransactions((prev) => [transaction, ...prev])
    showToast("success", "Transaction added successfully!")
  }

  const deleteTransaction = async (id) => {
    try {
      console.log("Deleting transaction with ID:", id);
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTransactions((prev) => prev.filter((t) => t._id !== id))
    
      showToast("success", "Transaction deleted successfully!" || response.data.message)
    } catch (error) {
      showToast("error", error.message)
    }
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
