"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Login from "../components/Login"
import Register from "../components/Register"
import Dashboard from "../components/Dashboard"
import { Toaster } from "react-hot-toast"

export default function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
      setCurrentPage("dashboard")
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setCurrentPage("login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AnimatePresence mode="wait">
        {currentPage === "login" && (
          <Login key="login" onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage("register")} />
        )}
        {currentPage === "register" && (
          <Register key="register" onRegister={handleLogin} onSwitchToLogin={() => setCurrentPage("login")} />
        )}
        {currentPage === "dashboard" && user && <Dashboard key="dashboard" user={user} onLogout={handleLogout} />}
      </AnimatePresence>
      <Toaster position="top-right" />
    </div>
  )
}
