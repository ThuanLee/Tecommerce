import React, { createContext, useState } from 'react'

// Initiate Context
const CartContext = createContext();

// Provide Context
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || "[]"));

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }