"use client"

import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const LoginModal = () => {
  const { isLoginOpen, closeLogin, login } = useAuth()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(form)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLogin}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white">
                <h2 className="text-lg font-bold">Login</h2>
                <button onClick={closeLogin} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={onSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Use 123456"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Dummy password: 123456</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LoginModal