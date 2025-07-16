"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Shield, Palette, Download, Trash2 } from "lucide-react"

export default function Settings({ user, showToast }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    currency: "USD",
    timezone: "America/New_York",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    budgetAlerts: true,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data", icon: Download },
  ]

  const handleSaveProfile = () => {
    showToast("success", "Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    showToast("success", "Notification preferences saved!")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={profileData.currency}
                onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveProfile}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </motion.button>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {key === "emailNotifications" && "Receive updates via email"}
                    {key === "pushNotifications" && "Get push notifications on your device"}
                    {key === "weeklyReports" && "Weekly financial summary reports"}
                    {key === "budgetAlerts" && "Alerts when approaching budget limits"}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveNotifications}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Save Preferences
            </motion.button>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Change Password</h3>
              <p className="text-sm text-yellow-700">Update your password to keep your account secure.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Update Password
            </motion.button>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Theme Settings</h3>
              <p className="text-sm text-blue-700">Customize the appearance of your dashboard.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                  <div className="w-full h-20 bg-white rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Light</p>
                </div>
                <div className="p-4 border-2 border-gray-300 bg-gray-800 rounded-lg">
                  <div className="w-full h-20 bg-gray-700 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center text-white">Dark</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "data":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Export Data</h3>
              <p className="text-sm text-green-700">Download your financial data for backup or analysis.</p>
            </div>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Export as CSV</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Export as PDF</span>
              </motion.button>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-8">
              <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </motion.button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-blue-600" : "text-gray-400"}`} />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
