"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, DollarSign, FileText, Calendar, Tag, TrendingUp, TrendingDown, CheckCircle } from "lucide-react"

export default function AddTransaction({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Bonus", "Other"],
    expense: [
      "Food & Dining",
      "Transportation",
      "Entertainment",
      "Bills & Utilities",
      "Shopping",
      "Healthcare",
      "Education",
      "Travel",
      "Other",
    ],
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.category || !formData.amount) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      onAddTransaction({
        ...formData,
        amount: Number.parseFloat(formData.amount),
      })

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      setFormData({
        type: "expense",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Add New Transaction</h1>
          <p className="text-gray-600 text-lg">Record your income or expense to keep track of your finances</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Transaction Details</h2>
                <p className="text-gray-500">Fill in the information below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Transaction Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: "income", category: "" }))}
                    className={`p-4 lg:p-6 rounded-xl border-2 transition-all font-medium ${
                      formData.type === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <TrendingUp className="w-6 h-6" />
                      <span className="font-semibold">Income</span>
                      <span className="text-xs opacity-75">Money coming in</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: "expense", category: "" }))}
                    className={`p-4 lg:p-6 rounded-xl border-2 transition-all font-medium ${
                      formData.type === "expense"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <TrendingDown className="w-6 h-6" />
                      <span className="font-semibold">Expense</span>
                      <span className="text-xs opacity-75">Money going out</span>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg font-semibold"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Select a category</option>
                    {categories[formData.type].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
                    placeholder="Add a note about this transaction..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Adding Transaction...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Transaction
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <div>
                    <h3 className="font-semibold text-emerald-800">Success!</h3>
                    <p className="text-sm text-emerald-600">Transaction added successfully</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">💡 Quick Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Be specific with categories to better track your spending patterns</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Add notes to remember what the transaction was for</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Record transactions as soon as possible for accuracy</p>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">📊 Popular Categories</h3>
              <div className="space-y-2">
                {formData.type === "expense" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Food & Dining</span>
                      <span className="text-gray-400">32%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transportation</span>
                      <span className="text-gray-400">18%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bills & Utilities</span>
                      <span className="text-gray-400">15%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Salary</span>
                      <span className="text-gray-400">65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Freelance</span>
                      <span className="text-gray-400">20%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investment</span>
                      <span className="text-gray-400">10%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
