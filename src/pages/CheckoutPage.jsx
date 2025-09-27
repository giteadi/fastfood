"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPinIcon, UserIcon, CreditCardIcon } from "@heroicons/react/24/outline"
import { useCart } from "../context/CartContext"
import { useOrder } from "../context/OrderContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { foodItems as products } from "../data/foodItems"

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { createOrder } = useOrder()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "cod",
  })

  // Load Razorpay checkout script once for dummy payments
  useEffect(() => {
    const loadRazorpayScript = () => {
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (!existing) {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
      }
    }
    loadRazorpayScript()
  }, [])

  // Merge cart items with product metadata for potential payment payloads
  const mergedCartItems = cartItems.map((item) => {
    const product = products.find(
      (p) => p.id === item.id || p.name === item.name || p.title === item.title,
    )
    const productId = product?.id
    return {
      ...item,
      images: product ? [product.image] : [],
      product_id: productId,
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!cartItems.length) {
      toast.error("Your cart is empty")
      return
    }

    setIsProcessing(true)
    try {
      // If card payment selected, open Razorpay dummy checkout
      if (formData.paymentMethod === "card") {
        if (!window.Razorpay) {
          toast.error("Payment service not ready. Please try again in a moment.")
          return
        }

        const options = {
          key: "rzp_test_suGlReUubwbXnb",
          amount: finalTotal * 100, // amount in paise
          currency: "INR",
          name: "Easy Deal",
          description: `Payment for ${cartItems.length} item(s)`,
          notes: { merchant_id: "PRQMRBhNYCqX79" },
          handler: () => {
            try {
              const orderId = createOrder({
                items: cartItems,
                total: getCartTotal(),
                customer: formData,
                paymentMethod: "razorpay",
              })
              clearCart()
              toast.success(`Payment successful! Order #${orderId} placed.`)
              navigate("/")
            } catch (err) {
              toast.error("Failed to place order after payment. Please contact support.")
            }
          },
          prefill: {
            name: formData.name || "",
            email: formData.email || "",
            contact: formData.phone || "",
          },
          theme: { color: "#EAB308" },
        }

        const rzp = new window.Razorpay(options)
        rzp.on("payment.failed", function (response) {
          toast.error(response?.error?.description || "Payment failed. Please try again.")
        })
        rzp.open()
      } else {
        // Cash on Delivery path
        const orderId = createOrder({
          items: cartItems,
          total: getCartTotal(),
          customer: formData,
          paymentMethod: formData.paymentMethod,
        })

        clearCart()
        toast.success(`Order #${orderId} placed successfully!`)
        navigate("/")
      }
    } catch (err) {
      toast.error("Failed to process request. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const deliveryFee = 29
  const tax = Math.round(getCartTotal() * 0.05)
  const finalTotal = getCartTotal() + deliveryFee + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <UserIcon className="w-5 h-5 mr-2" />
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
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
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
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
                Cash on Delivery
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                Card / UPI
              </label>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isProcessing}
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: isProcessing ? 1 : 0.98 }}
            className={`w-full py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg transition-all ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-yellow-400 text-white hover:shadow-xl"
            }`}
          >
            {isProcessing ? "Processing Order..." : `Place Order - ₹${finalTotal}`}
          </motion.button>
        </form>

        {/* Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
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
            <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
              <span>Total</span>
              <span className="text-pink-600">₹{finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage