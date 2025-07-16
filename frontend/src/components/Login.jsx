"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, TrendingUp, Shield, Smartphone } from "lucide-react"
import axios from 'axios'

export default function Login({ onLogin, onSwitchToRegister, showToast }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

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

    setIsLoading(true)

    try {
     
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: formData.email,
        password: formData.password
      })

      const {token, user} = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      onLogin(user)
    } catch (error) {
      showToast("error", response.error.message || "Login failed. Please try again.")
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
      {/* Left Side - Beautiful Visual */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden flex items-center justify-center p-8 lg:p-12"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 lg:top-20 left-10 lg:left-20 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 lg:bottom-32 right-8 lg:right-16 w-16 h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/4 w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full backdrop-blur-sm"
        />

        {/* Main Content */}
        <div className="text-white relative z-10 text-center lg:text-left max-w-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mb-6 lg:mb-8"
          >
            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto lg:mx-0 mb-4 lg:mb-6">
              <TrendingUp className="w-8 h-8 lg:w-12 lg:h-12" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight"
          >
            Take Control of Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Financial Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-12 leading-relaxed"
          >
            Track expenses, set budgets, and achieve your financial goals with our intuitive platform
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 lg:gap-8"
          >
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold">10K+</div>
              <div className="text-white/80 text-sm lg:text-base">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold">$2M+</div>
              <div className="text-white/80 text-sm lg:text-base">Money Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold">99%</div>
              <div className="text-white/80 text-sm lg:text-base">Satisfaction</div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-8 lg:mt-12 space-y-4"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90">Bank-level security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90">Mobile-first design</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90">Smart analytics</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-gray-50 min-h-screen lg:min-h-0"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your dashboard</p>
          </motion.div>

          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white ${
                    errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-emerald-500 hover:text-emerald-600 font-semibold transition-colors"
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
