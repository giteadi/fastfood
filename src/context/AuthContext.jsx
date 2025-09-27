"use client"

import { createContext, useContext, useState } from "react"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const isAuthenticated = !!user

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)

  const login = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      toast.error("Please fill in name, email, and password")
      return false
    }
    // Dummy password check (shown on the form)
    if (password !== "123456") {
      toast.error("Invalid password. Use the dummy password shown.")
      return false
    }
    setUser({ name, email })
    closeLogin()
    toast.success(`Welcome, ${name}!`)
    return true
  }

  const logout = () => {
    setUser(null)
    toast.success("Logged out")
  }

  const value = {
    user,
    isAuthenticated,
    isLoginOpen,
    openLogin,
    closeLogin,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}