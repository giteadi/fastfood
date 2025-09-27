"use client"
import { motion } from "framer-motion"
import { ShoppingCartIcon, MagnifyingGlassIcon, ClockIcon } from "@heroicons/react/24/outline"
import VegToggle from "./VegToggle"
import { useCart } from "../context/CartContext"

const Header = ({
  onCartClick,
  onOrderHistoryClick,
  searchTerm,
  onSearchChange,
  dietaryFilter,
  onDietaryFilterChange,
}) => {
  const { getCartCount } = useCart()

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ED</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Easy Deal</h1>
              <p className="text-xs text-gray-600">Delicious Food, Delivered Fast</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for delicious food..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <VegToggle dietaryFilter={dietaryFilter} onDietaryFilterChange={onDietaryFilterChange} />

            {/* Order History Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOrderHistoryClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ClockIcon className="w-5 h-5" />
              <span className="font-medium">Orders</span>
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <ShoppingCartIcon className="w-5 h-5 inline mr-2" />
              Cart
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
