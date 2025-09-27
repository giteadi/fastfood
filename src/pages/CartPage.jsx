"use client"

import { motion } from "framer-motion"
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <ShoppingBagIcon className="w-6 h-6 mr-2" />
          Your Cart ({getCartCount()})
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
          >
            Proceed to Checkout
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">₹{item.price}</p>
                    <div className="flex items-center mt-1">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center ${
                          item.isVeg ? "border-green-500" : "border-red-500"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                      <span className={`text-xs ml-1 ${item.isVeg ? "text-green-600" : "text-red-600"}`}>
                        {item.isVeg ? "Veg" : "Non-Veg"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 border rounded-full hover:bg-gray-50"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 border rounded-full hover:bg-gray-50"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹29</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{Math.round(getCartTotal() * 0.05)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-pink-600">₹{getCartTotal() + 29 + Math.round(getCartTotal() * 0.05)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Place Order
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage