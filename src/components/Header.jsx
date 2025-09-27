"use client"
import { motion } from "framer-motion"
import { ShoppingCartIcon, MagnifyingGlassIcon, ClockIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { restaurants } from "../data/restaurants"
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
  const navigate = useNavigate()

  const suggestions = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase()
    if (!term) return []
    const list = Object.values(restaurants)
      .filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.cuisines.join(", ").toLowerCase().includes(term) ||
          r.address.toLowerCase().includes(term),
      )
      .slice(0, 5)
    return list
  }, [searchTerm])

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

          {/* Search Bar - Desktop/Tablet (inline) */}
          <div className="hidden sm:block flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for delicious food..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/restaurants")
                  }
                }}
                className="w-full pl-10 pr-4 py-2 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {searchTerm && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {suggestions.length > 0 ? (
                    suggestions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => navigate(`/restaurant/${r.id}`)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-800">{r.name}</span>
                        <span className="text-xs text-gray-500">{r.cuisines.join(", ")}</span>
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => navigate("/restaurants")}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                    >
                      No match — View all restaurants
                    </button>
                  )}
                </div>
              )}
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
              <span className="font-medium text-sm sm:text-base inline">Restaurants</span>
            </Link>

            {/* Cart Link - Responsive */}
            <Link
              to="/cart"
              className="relative bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-2.5 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
            >
              <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
              <span className="sm:hidden">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-3.5 h-3.5 sm:w-5 sm:h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - placed below header for better UX */}
        <div className="sm:hidden mt-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for delicious food..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/restaurants")
                }
              }}
              className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            {searchTerm && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                {suggestions.length > 0 ? (
                  suggestions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => navigate(`/restaurant/${r.id}`)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-800">{r.name}</span>
                      <span className="text-xs text-gray-500">{r.cuisines.join(", ")}</span>
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => navigate("/restaurants")}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                  >
                    No match — View all restaurants
                  </button>
                )}
              </div>
            )}
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