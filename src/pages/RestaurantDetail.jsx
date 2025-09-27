"use client"

import { useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { StarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid"
import { foodItems } from "../data/foodItems"
import FoodCard from "../components/FoodCard"

const sampleRestaurants = {
  "sizzling-spice": {
    id: "sizzling-spice",
    name: "Sizzling Spice",
    rating: 4.5,
    votes: 1200,
    address: "123 Food Street, Mumbai",
    cuisines: ["North Indian", "Chinese", "Fast Food"],
    deliveryTime: "25-35 mins",
    costForTwo: "₹400 for two",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
}

const RestaurantDetail = () => {
  const { id } = useParams()
  const restaurant = sampleRestaurants[id] || sampleRestaurants["sizzling-spice"]

  const menuItems = useMemo(() => {
    // In real app, fetch items by restaurant id; here reuse foodItems
    return foodItems
  }, [])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-52 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center bg-white/20 backdrop-blur px-3 py-1 rounded-full">
              <StarIcon className="w-5 h-5 text-yellow-300 mr-1" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-xs ml-2">({restaurant.votes}+ ratings)</span>
            </div>
          </div>
          <div className="mt-2 text-sm sm:text-base flex flex-wrap gap-2">
            <span>{restaurant.cuisines.join(", ")}</span>
            <span>• {restaurant.costForTwo}</span>
            <span className="flex items-center">• <ClockIcon className="w-4 h-4 ml-1 mr-1" /> {restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <MapPinIcon className="w-6 h-6 text-pink-600" />
          <div>
            <h3 className="font-semibold text-gray-800">Address</h3>
            <p className="text-gray-600 text-sm sm:text-base">{restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recommended</h2>
        <Link
          to="/"
          className="text-sm sm:text-base text-pink-600 hover:text-pink-700 font-medium"
        >
          Back to Menu
        </Link>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <FoodCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default RestaurantDetail