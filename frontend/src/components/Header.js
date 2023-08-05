import React, { useContext } from 'react'
import '../styles/Header.css'
import { useNavigate } from "react-router-dom"
import { CartContext } from '../contexts/CartContext'

const Header = () => {
  const navigate = useNavigate()

  const context = useContext(CartContext)

  return (
    <nav className="header">
      <div className="logo" onClick={() => navigate("/")}>
        TCOMMERCE
      </div>

      <div className="item search right" tabindex="0">
        <div className="search-group">
          <input type="text"/>
          <i className="fa-solid fa-magnifying-glass search-icon"/>
        </div>
      </div>
      
      <div className="item cart">
        <p>{context.cart.length}</p>
        <i className="fas fa-shopping-cart fa-lg"/>
      </div>

      <div className="item user">
        <i className="fa-regular fa-user fa-lg"></i>
      </div>
    </nav>
  )
}

export default Header