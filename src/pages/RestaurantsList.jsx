"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid"
import { restaurants } from "../data/restaurants"

const RestaurantsList = () => {
  const entries = Object.values(restaurants)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {entries.length} Restaurants
        </h1>
        <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium text-sm sm:text-base">
          Back to Home
        </Link>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((r, index) => (
          <motion.div
            key={r.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <Link to={`/restaurant/${r.id}`} className="block">
              <div className="h-40 sm:h-48">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-lg">{r.name}</h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full text-sm">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{r.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.cuisines.join(", ")}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPinIcon className="w-4 h-4 mr-1" /> {r.address}
                </div>
                <p className="text-gray-700 font-medium text-sm">{r.costForTwo}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default RestaurantsList