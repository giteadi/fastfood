"use client"

import { createContext, useContext, useReducer } from "react"

const OrderContext = createContext()

const orderReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      const newOrder = {
        id: Date.now().toString().slice(-6),
        ...action.payload,
        status: "preparing",
      }
      return [newOrder, ...state]

    case "UPDATE_ORDER_STATUS":
      return state.map((order) =>
        order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order,
      )

    default:
      return state
  }
}

export const OrderProvider = ({ children }) => {
  const [orders, dispatch] = useReducer(orderReducer, [])

  const createOrder = (orderData) => {
    dispatch({ type: "CREATE_ORDER", payload: orderData })
    const orderId = Date.now().toString().slice(-6)

    // Simulate order status updates
    setTimeout(() => {
      dispatch({
        type: "UPDATE_ORDER_STATUS",
        payload: { orderId, status: "on-the-way" },
      })
    }, 20000) // 20 seconds

    setTimeout(() => {
      dispatch({
        type: "UPDATE_ORDER_STATUS",
        payload: { orderId, status: "delivered" },
      })
    }, 60000) // 1 minute

    return orderId
  }

  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status },
    })
  }

  const value = {
    orders,
    createOrder,
    updateOrderStatus,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
