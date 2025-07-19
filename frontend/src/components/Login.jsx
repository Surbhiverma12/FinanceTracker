"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, TrendingUp, Shield, Smartphone } from 'lucide-react'
import axios from "axios"

export default function Login({ onLogin, onSwitchToRegister, showToast }) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsLoading(true)
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      onLogin(user)
    } catch (error) {
      showToast("error", error.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    const { email } = formData

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Valid email is required" })
      return
    }

    try {
      setIsLoading(true)
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email })
      showToast("success", "Password reset link sent! Check your inbox.")
      setIsForgotPassword(false)
    } catch (error) {
      showToast("error", error.response?.data?.message || "Failed to send reset link.")
    } finally {
      setIsLoading(false)
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Visual */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 relative flex items-center justify-center p-8 lg:p-12"
      >
        {/* Simple background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Content */}
        <div className="text-white relative z-10 text-center lg:text-left max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto lg:mx-0 mb-6">
              <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
          >
            Welcome back to your
            <span className="block text-emerald-200">Financial Dashboard</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/90 mb-8 leading-relaxed"
          >
            Track your expenses, manage budgets, and achieve your financial goals with ease.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-emerald-200" />
              <span className="text-white/90">Bank-level security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-emerald-200" />
              <span className="text-white/90">Mobile-friendly design</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-emerald-200" />
              <span className="text-white/90">Smart financial insights</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-slate-50 min-h-screen lg:min-h-0"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-600">Access your financial dashboard</p>
          </motion.div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white ${
                    errors.email ? "border-red-300 bg-red-50" : "border-slate-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Conditionally show password field only if not in forgot password mode */}
            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white ${
                      errors.password ? "border-red-300 bg-red-50" : "border-slate-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>
            )}

            {/* Forgot Password Toggle */}
            {!isForgotPassword && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  {isForgotPassword ? "Sending..." : "Signing In..."}
                </div>
              ) : (
                <div className="flex items-center">
                  {isForgotPassword ? "Send Reset Link" : "Sign In"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </motion.button>

            {/* Switch Back */}
            {isForgotPassword && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors mt-2"
                >
                  Back to login
                </button>
              </div>
            )}
          </motion.form>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-slate-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Create Account
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
