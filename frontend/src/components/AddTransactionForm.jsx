"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, DollarSign, FileText, Calendar, IndianRupee } from "lucide-react"
import axios from "axios"
import { useCurrency } from "../CurrencyContext"

export default function AddTransactionForm({ onAddTransaction }) {
  const { currency } = useCurrency();

  const CurrencyIcon = currency === 'USD' ? DollarSign : IndianRupee;

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: new Date().toLocaleDateString('en-IN'),
    note: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Other"],
    expense: ["Food", "Transportation", "Entertainment", "Bills", "Shopping", "Healthcare", "Other"],
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.category || !formData.amount) {
      return
    }

    setIsLoading(true)

    try {
      // await new Promise((resolve) => setTimeout(resolve, 500))

      // onAddTransaction({
      //   ...formData,
      //   amount: Number.parseFloat(formData.amount),
      // })

      const token = localStorage.getItem('token')
      const response  = await axios.post('http://localhost:3000/api/transactions',
        {
            type: formData.type,
            category: formData.category,
            amount: parseFloat(formData.amount),
            date: formData.date,
            note: formData.note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      )
      console.log(response)
      const added = response.data.transaction

      onAddTransaction(added)
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
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Add Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: "income", category: "" }))}
              className={`p-3 rounded-lg border-2 transition-all font-medium ${
                formData.type === "income"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              Income
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: "expense", category: "" }))}
              className={`p-3 rounded-lg border-2 transition-all font-medium ${
                formData.type === "expense"
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              Expense
            </motion.button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select category</option>
            {categories[formData.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <CurrencyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="3"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder="Add a note..."
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Adding...
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
  )
}
