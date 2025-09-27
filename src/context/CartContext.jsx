"use client"

import { createContext, useContext, useReducer } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...state, { ...action.payload, quantity: 1 }]

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return state.filter((item) => item.id !== action.payload.id)
      }
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload)

    case "CLEAR_CART":
      return []

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [])

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
