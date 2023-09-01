import React, { useContext } from 'react'
import '../styles/Header.css'
import { useNavigate } from "react-router-dom"
import { CartContext } from '../contexts/cartContext'
import SearchBar from './SearchBar'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import { checkLogged } from '../utils/userAuth'
import { loginFirstToast } from '../utils/toast'

const Header = () => {

  const navigate = useNavigate()
  const cartContext = useContext(CartContext)

  const cartHandle = () => {
    if (checkLogged()) {
      navigate('/cart/')
    } else {
      cartContext.setCart([])
      loginFirstToast()
    }
  }

  return (
    <nav className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <p>TECOMMERCE</p>
      </div>

      <SearchBar />
      
      <div className="item cart" onClick={cartHandle}>
      <Badge color="secondary" badgeContent={cartContext.cart.quantity_in_cart}
        max={99} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
        <ShoppingCartIcon sx={{ fontSize: 26 }} />
      </Badge>

      </div>

      <div className="item user" onClick={() => checkLogged() ? navigate("/profile/") : navigate("/login/")}>
        <PersonIcon sx={{ fontSize: 30 }}/>
      </div>
    </nav>
  )
}

export default Header