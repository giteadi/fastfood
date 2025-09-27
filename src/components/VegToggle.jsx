"use client"
import { motion } from "framer-motion"

const VegToggle = ({ dietaryFilter, onDietaryFilterChange }) => {
  const options = [
    { id: "all", label: "All", color: "gray" },
    { id: "veg", label: "Veg", color: "green" },
    { id: "non-veg", label: "Non-Veg", color: "red" },
  ]

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      {options.map((option) => (
        <motion.button
          key={option.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDietaryFilterChange(option.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
            dietaryFilter === option.id
              ? option.id === "veg"
                ? "bg-green-500 text-white shadow-md"
                : option.id === "non-veg"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-700 text-white shadow-md"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {/* Veg/Non-Veg Indicator */}
          {option.id !== "all" && (
            <div
              className={`w-4 h-4 border-2 flex items-center justify-center ${
                option.id === "veg"
                  ? dietaryFilter === "veg"
                    ? "border-white"
                    : "border-green-500"
                  : dietaryFilter === "non-veg"
                    ? "border-white"
                    : "border-red-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  option.id === "veg"
                    ? dietaryFilter === "veg"
                      ? "bg-white"
                      : "bg-green-500"
                    : dietaryFilter === "non-veg"
                      ? "bg-white"
                      : "bg-red-500"
                }`}
              ></div>
            </div>
          )}
          <span>{option.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default VegToggle
