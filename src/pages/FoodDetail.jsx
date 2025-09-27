"use client"

import { useMemo } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { foodItems } from "../data/foodItems"
import { restaurants } from "../data/restaurants"

const FoodDetail = () => {
  const { id } = useParams()
  const itemId = Number(id)
  const item = useMemo(() => foodItems.find((f) => f.id === itemId), [itemId])
  const restaurant = item ? restaurants[item.restaurantId] || restaurants["sizzling-spice"] : restaurants["sizzling-spice"]
  const { addToCart } = useCart()
  const { isAuthenticated, openLogin } = useAuth()
  const navigate = useNavigate()

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Food item not found</p>
        <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">Back to menu</Link>
      </div>
    )
  }

  const handleAdd = () => {
    if (!isAuthenticated) {
      openLogin()
      return
    }
    addToCart(item)
    toast.success(`${item.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    })
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openLogin()
      return
    }
    addToCart(item)
    navigate("/checkout")
  }

  return (
    <div className="space-y-6">
      {/* Item Hero */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{item.name}</h1>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 font-semibold">{item.rating}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-1" />
                {item.cookTime}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${item.isVeg ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {item.isVeg ? "Veg" : "Non-Veg"}
              </span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">₹{item.price}</div>
              <div className="flex w-full sm:w-auto gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="flex-1 sm:flex-none w-full sm:w-auto bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-5 sm:px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-none w-full sm:w-auto bg-gray-800 text-white px-5 sm:px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>
          <div className="h-48 sm:h-56 md:h-full">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Restaurant reviews */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{restaurant.name} Reviews</h2>
          <Link to={`/restaurant/${restaurant.id}`} className="text-pink-600 hover:text-pink-700 font-medium">
            View Restaurant
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(restaurant.reviews || []).map((rev, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{rev.user}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-4 h-4 ${i < rev.rating ? "text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{rev.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{rev.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodDetail