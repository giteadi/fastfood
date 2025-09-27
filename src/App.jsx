"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import FoodMenu from "./components/FoodMenu"
import OrderHistory from "./components/OrderHistory"
import { CartProvider } from "./context/CartContext"
import { OrderProvider } from "./context/OrderContext"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import RestaurantDetail from "./pages/RestaurantDetail"
import FoodDetail from "./pages/FoodDetail"
import RestaurantsList from "./pages/RestaurantsList"


function App() {
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dietaryFilter, setDietaryFilter] = useState("all")

  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Header
            onOrderHistoryClick={() => setIsOrderHistoryOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dietaryFilter={dietaryFilter}
            onDietaryFilterChange={setDietaryFilter}
          />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<FoodMenu searchTerm={searchTerm} dietaryFilter={dietaryFilter} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/restaurants" element={<RestaurantsList searchTerm={searchTerm} />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/food/:id" element={<FoodDetail />} />
            </Routes>
          </main>
          <OrderHistory isOpen={isOrderHistoryOpen} onClose={() => setIsOrderHistoryOpen(false)} />
        </div>
      </CartProvider>
    </OrderProvider>
  )
}

export default App
