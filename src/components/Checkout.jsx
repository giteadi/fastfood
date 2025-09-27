"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, MapPinIcon, UserIcon, CreditCardIcon } from "@heroicons/react/24/outline"
import { useCart } from "../context/CartContext"
import { useOrder } from "../context/OrderContext"
import toast from "react-hot-toast"

const Checkout = ({ isOpen, onClose }) => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { createOrder } = useOrder()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "cod",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderData = {
        items: cartItems,
        total: getCartTotal(),
        customerInfo: formData,
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
      }

      const orderId = createOrder(orderData)
      clearCart()
      onClose()

      toast.success("Order placed successfully!", {
        icon: "🎉",
        duration: 4000,
      })

      // Show order confirmation
      setTimeout(() => {
        toast.success(`Order #${orderId} is being prepared!`, {
          icon: "👨‍🍳",
          duration: 6000,
        })
      }, 1000)
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const deliveryFee = 29
  const tax = Math.round(getCartTotal() * 0.05)
  const finalTotal = getCartTotal() + deliveryFee + tax

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

          {/* Checkout Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-pink-500 to-yellow-400 text-white">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2" />
                    Customer Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    Delivery Address
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your complete delivery address"
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when your order arrives</div>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Online Payment</div>
                        <div className="text-sm text-gray-600">Pay now with UPI/Card</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-800">Order Summary</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-pink-600">₹{finalTotal}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <motion.button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                className={`w-full py-3 rounded-full font-semibold text-lg shadow-lg transition-all ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-yellow-400 text-white hover:shadow-xl"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </div>
                ) : (
                  `Place Order - ₹${finalTotal}`
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Checkout
