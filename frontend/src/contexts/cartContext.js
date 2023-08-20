import React, { createContext, useEffect, useState } from 'react'
import { getCart } from '../services/cartSevice';
import { checkLogged, getUserId } from '../utils/userAuth'

// Initiate Context
const CartContext = createContext();

// Provide Context
const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      if (checkLogged()) {
        setCart(await getCart(getUserId()))
      }
    }
    callAPI()
  }, [])
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }