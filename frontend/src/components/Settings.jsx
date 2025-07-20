"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Shield, Palette, LogOut, Save, Eye, EyeOff } from "lucide-react"
import { useCurrency } from "../CurrencyContext"
import axios from "axios"

export default function Settings({ user, onLogout, showToast }) {
  const { currency, setCurrency } = useCurrency()
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [settings, setSettings] = useState({
    name: user?.name || "",
    email: user?.email || "",
    notifications: true,
    darkMode: false,
    currency: currency,
    language: "English",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (newPassword !== confirmNewPassword) {
      showToast("error", "New passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", "Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      console.log(err)
      const msg =
        err.response?.data?.message || "Error changing password";
      showToast("error", msg);
    }
  };


  const token = localStorage.getItem("token")

  // Load settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.data) {
          setSettings((prev) => ({
            ...prev,
            ...res.data,
          }))
        }
      } catch (err) {
        console.error("Error loading settings", err)
      }
    }

    fetchSettings()
  }, [])

  // Save settings to backend
  const handleSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/settings`,
        {
          name: settings.name,
          email: settings.email,
          currency: settings.currency,
          notifications: settings.notifications,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCurrency(settings.currency)
      showToast("success", "Settings saved successfully!")
    } catch (error) {
      console.error("Error saving settings", error)
      showToast("error", "Failed to save settings")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="p-4 md:p-6 lg:p-10 ">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">⚙️ Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile Settings */}
          <Section title="Profile" icon={<User className="w-5 h-5 text-gray-600" />}>
            <Input label="Name" name="name" value={settings.name} onChange={handleChange} />
            <Input label="Email" name="email" value={settings.email} disabled />
          </Section>

          {/* Notifications */}
          <Section title="Notifications" icon={<Bell className="w-5 h-5 text-gray-600" />}>
            <Toggle
              label="Push Notifications"
              description="Receive alerts for transactions"
              enabled={settings.notifications}
              onToggle={() =>
                setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))
              }
            />
          </Section>

          {/* Appearance */}
          <Section title="Appearance" icon={<Palette className="w-5 h-5 text-gray-600" />}>
            <Select
              label="Currency"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              options={[
                { label: "USD ($)", value: "USD" },
                { label: "INR (₹)", value: "INR" },
                { label: "EUR (€)", value: "EUR" },
              ]}
            />
            <Select
              label="Language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              options={[
                { label: "English", value: "English" },
                { label: "Hindi", value: "Hindi" },
                { label: "French", value: "French" },
              ]}
            />
          </Section>

          {/* Security */}
          <Section title="Security" icon={<Shield className="w-5 h-5 text-gray-600" />}>
        <div className="relative">
  <input
    type={showCurrent ? "text" : "password"}
    name="currentPassword"
    value={passwordData.currentPassword}
    onChange={handlePasswordChange}
    placeholder="Current Password"
    className="w-full border rounded-lg px-4 py-2 pr-10"
  />
  <div
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
    onClick={() => setShowCurrent((prev) => !prev)}
  >
    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
  </div>
</div>

{/* New Password */}
<div className="relative mt-4">
  <input
    type={showNew ? "text" : "password"}
    name="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordChange}
    placeholder="New Password"
    className="w-full border rounded-lg px-4 py-2 pr-10"
  />
  <div
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
    onClick={() => setShowNew((prev) => !prev)}
  >
    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
  </div>
</div>

{/* Confirm New Password */}
<div className="relative mt-4">
  <input
    type={showConfirm ? "text" : "password"}
    name="confirmNewPassword"
    value={passwordData.confirmNewPassword}
    onChange={handlePasswordChange}
    placeholder="Confirm New Password"
    className="w-full border rounded-lg px-4 py-2 pr-10"
  />
  <div
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
    onClick={() => setShowConfirm((prev) => !prev)}
  >
    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
  </div>
</div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleChangePassword}
              className="w-full bg-emerald-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-600"
            >
              Change Password
            </motion.button>
          </Section>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex items-center justify-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="flex items-center justify-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Reusable Section component
function Section({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Input({ label, name, value, onChange, disabled, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function Toggle({ label, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
