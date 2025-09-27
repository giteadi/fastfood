"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import FoodMenu from "./components/FoodMenu"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import OrderHistory from "./components/OrderHistory"
import { CartProvider } from "./context/CartContext"
import { OrderProvider } from "./context/OrderContext"


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dietaryFilter, setDietaryFilter] = useState("all")

  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onOrderHistoryClick={() => setIsOrderHistoryOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dietaryFilter={dietaryFilter}
            onDietaryFilterChange={setDietaryFilter}
          />
          <main className="container mx-auto px-4 py-8">
            <FoodMenu searchTerm={searchTerm} dietaryFilter={dietaryFilter} />
          </main>
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              setIsCartOpen(false)
              setIsCheckoutOpen(true)
            }}
          />
          <Checkout isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
          <OrderHistory isOpen={isOrderHistoryOpen} onClose={() => setIsOrderHistoryOpen(false)} />
        </div>
      </CartProvider>
    </OrderProvider>
  )
}

export default App
