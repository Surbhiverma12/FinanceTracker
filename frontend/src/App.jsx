"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Login from "./components/Login"
import Register from "./components/Register"
import MainApp from "./components/MainApp"
import Toast from "./components/Toast"
import axios from "axios"
import { CurrencyProvider } from "./CurrencyContext"
import ResetPassword from "./components/ResetPassword" 
import { Routes, Route, useLocation } from "react-router-dom"

export default function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const location = useLocation();
  useEffect(() => { 
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        setCurrentPage("app")
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

 const showToast = (type, message) => {
    const displayMessage =
      typeof message === "string"
        ? message
        : message?.message || JSON.stringify(message)

    setToast({ type, message: displayMessage })
    setTimeout(() => setToast(null), 4000)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage("app")
    showToast("success", "Welcome back!")
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setCurrentPage("app")
    showToast("success", "Account created successfully!")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setCurrentPage("login")
    showToast("success", "Logged out successfully")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <CurrencyProvider>
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/reset-password/:token"
              element={
                <ResetPassword
                  key="reset-route"
                  onSwitchToLogin={() => setCurrentPage("login")}
                  showToast={showToast}
                />
              }
            />
          </Routes>

          {currentPage === "login" && (
            <Login
              key="login"
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentPage("register")}
              showToast={showToast}
            />
          )}

          {currentPage === "register" && (
            <Register
              key="register"
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentPage("login")}
              showToast={showToast}
            />
          )}

          {currentPage === "app" && user && (
            <MainApp key="app" user={user} onLogout={handleLogout} showToast={showToast} />
          )}

          {currentPage === "forgotPassword" && (
            <ResetPassword
              key="reset"
              onSwitchToLogin={() => setCurrentPage("login")}
              showToast={showToast}
            />
          )}
        </>
      </AnimatePresence>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
    </CurrencyProvider>
  )
}
