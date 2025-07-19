"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, X } from "lucide-react"

export default function Toast({ type, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for exit animation
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  const getReadableMessage = () => {
  if (typeof message === "string") return message
  if (message?.message) return message.message
  if (message?.error) return message.error
  if (message?.code && message?.command) return `Code: ${message.code}, Command: ${message.command}`
  return JSON.stringify(message)
}


  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />
    }
  }

  // Don't render when not visible
  if (!isVisible) return null
  console.log(JSON.stringify(message))

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50 max-w-sm w-full"
    >
      <div className={`rounded-lg border p-4 shadow-lg ${getToastStyles()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <p className="font-medium">{getReadableMessage()}</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
