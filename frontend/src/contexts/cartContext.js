import React, { createContext, useEffect, useState } from 'react'
import { getCart } from '../services/cartSevice';
import { checkLogged } from '../utils/checkLogged'
import jwt_decode from 'jwt-decode';

// Initiate Context
const CartContext = createContext();

// Provide Context
const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      if (checkLogged()) {
        const token = JSON.parse(localStorage.getItem('token'))
        const userId = jwt_decode(token.access).user_id
        setCart(await getCart(userId))
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