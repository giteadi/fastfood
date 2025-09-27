"use client"
import { motion } from "framer-motion"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300 hover:text-pink-600"
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default CategoryFilter
