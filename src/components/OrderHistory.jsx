"use client"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, ClockIcon, CheckCircleIcon, TruckIcon } from "@heroicons/react/24/outline"
import { useOrder } from "../context/OrderContext"

const OrderHistory = ({ isOpen, onClose }) => {
  const { orders } = useOrder()

  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case "on-the-way":
        return <TruckIcon className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Being Prepared"
      case "on-the-way":
        return "On the Way"
      case "delivered":
        return "Delivered"
      default:
        return "Processing"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "on-the-way":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Order History Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-pink-500 to-yellow-400 text-white">
              <h2 className="text-xl font-bold">Order History</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto p-4">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                  <p className="text-gray-400 text-sm">Your order history will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span>{item.name}</span>
                              <span className="text-gray-500">x{item.quantity}</span>
                            </div>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-pink-600">₹{order.total}</span>
                      </div>

                      {/* Estimated Delivery */}
                      {order.status !== "delivered" && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                          <div className="flex items-center space-x-1">
                            <TruckIcon className="w-4 h-4" />
                            <span>
                              Estimated delivery:{" "}
                              {new Date(order.estimatedDelivery).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default OrderHistory
