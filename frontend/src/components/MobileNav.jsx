"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Home, Plus, List, BarChart3, Settings } from "lucide-react"

export default function MobileNav({ isOpen, currentPage, onPageChange, onClose }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "add", label: "Add Transaction", icon: Plus },
    { id: "transactions", label: "Transactions", icon: List },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Finance Tracker</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                        currentPage === item.id
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
