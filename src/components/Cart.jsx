"use client"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useCart } from "../context/CartContext"

const Cart = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()

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

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <ShoppingBagIcon className="w-6 h-6 mr-2" />
                Your Cart ({getCartCount()})
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3">
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
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-lg px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-pink-600">₹{getCartTotal()}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
