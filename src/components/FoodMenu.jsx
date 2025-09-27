"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import FoodCard from "./FoodCard"
import CategoryFilter from "./CategoryFilter"
import { foodItems } from "../data/foodItems"

const FoodMenu = ({ searchTerm, dietaryFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // items imported from shared data

  const categories = [
    { id: "all", name: "All Items", icon: "🍽️" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "biryani", name: "Biryani", icon: "🍚" },
    { id: "burger", name: "Burgers", icon: "🍔" },
    { id: "starter", name: "Starters", icon: "🥗" },
    { id: "curry", name: "Curries", icon: "🍛" },
    { id: "rice", name: "Rice", icon: "🍚" },
  ]

  const filteredItems = useMemo(() => {
    let filtered = foodItems

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Filter by dietary preference
    if (dietaryFilter === "veg") {
      filtered = filtered.filter((item) => item.isVeg === true)
    } else if (dietaryFilter === "non-veg") {
      filtered = filtered.filter((item) => item.isVeg === false)
    }

    return filtered
  }, [searchTerm, selectedCategory, dietaryFilter])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Delicious Food,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
            Delivered Fast
          </span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Order from your favorite restaurants and enjoy fresh meals at your doorstep in minutes!
        </p>

        {(searchTerm || dietaryFilter !== "all" || selectedCategory !== "all") && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {searchTerm && (
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Search: "{searchTerm}"</span>
            )}
            {dietaryFilter !== "all" && (
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  dietaryFilter === "veg" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {dietaryFilter === "veg" ? "Vegetarian Only" : "Non-Vegetarian Only"}
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Category: {categories.find((cat) => cat.id === selectedCategory)?.name}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Food Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FoodCard item={item} />
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg mb-2">No items found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  )
}

export default FoodMenu
