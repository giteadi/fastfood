"use client"
import { motion } from "framer-motion"
import { PlusIcon, StarIcon, ClockIcon } from "@heroicons/react/24/solid"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const FoodCard = ({ item }) => {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e?.stopPropagation()
    addToCart(item)
    toast.success(`${item.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/food/${item.id}`)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Food Image */}
      <div className="relative">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-40 sm:h-48 object-cover" />
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-3 left-3">
          <div
            className={`w-6 h-6 border-2 flex items-center justify-center ${
              item.isVeg ? "border-green-500" : "border-red-500"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold">{item.rating}</span>
        </div>
      </div>

      {/* Food Details */}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        {/* Cook Time */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{item.cookTime}</span>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">₹{item.price}</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleAddToCart(e)}
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard
