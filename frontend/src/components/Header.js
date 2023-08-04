import React from 'react'
import '../styles/Header.css'
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
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
        <p>{JSON.parse(localStorage.getItem('cart') || "[]").length}</p>
        <i className="fas fa-shopping-cart fa-lg"/>
      </div>

      <div className="item user">
        <i className="fa-regular fa-user fa-lg"></i>
      </div>
    </nav>
  )
}

export default Header