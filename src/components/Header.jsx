"use client"
import { motion } from "framer-motion"
import { ShoppingCartIcon, MagnifyingGlassIcon, ClockIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import VegToggle from "./VegToggle"
import { useCart } from "../context/CartContext"

const Header = ({
  onOrderHistoryClick,
  searchTerm,
  onSearchChange,
  dietaryFilter,
  onDietaryFilterChange,
}) => {
  const { getCartCount } = useCart()

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo - Responsive */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1758950454/Group_1171275291_j2h8qq.png"
                alt="Easy Deal Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-none">
                Easy Deal
              </h1>
              <p className="text-xs text-gray-600 leading-none mt-0.5 hidden md:block">
                Delicious Food, Delivered Fast
              </p>
            </div>
            {/* Mobile-only simplified text */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-800">Easy Deal</h1>
            </div>
          </motion.div>

          {/* Search Bar - Responsive */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 lg:mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for delicious food..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* VegToggle - Hidden on mobile */}
            <div className="hidden sm:block">
              <VegToggle 
                dietaryFilter={dietaryFilter} 
                onDietaryFilterChange={onDietaryFilterChange} 
              />
            </div>

            {/* Order History Button - Responsive */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOrderHistoryClick}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Orders</span>
            </motion.button>

            {/* Restaurants Link */}
            <Link
              to="/restaurants"
              className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <BuildingStorefrontIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Restaurants</span>
            </Link>

            {/* Cart Link - Responsive */}
            <Link
              to="/cart"
              className="relative bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-3 sm:px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
            >
              <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
              <span className="sm:hidden">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile VegToggle - Shows below header on mobile */}
        <div className="sm:hidden mt-3 flex justify-center">
          <VegToggle 
            dietaryFilter={dietaryFilter} 
            onDietaryFilterChange={onDietaryFilterChange} 
          />
        </div>
      </div>
    </motion.header>
  )
}

export default Header