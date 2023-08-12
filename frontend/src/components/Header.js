import React, { useContext } from 'react'
import '../styles/Header.css'
import { useNavigate } from "react-router-dom"
import { CartContext } from '../contexts/cartContext'
import SearchBar from './SearchBar'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from '../contexts/userContext'

const Header = () => {

  const navigate = useNavigate()
  const cartContext = useContext(CartContext)
  const userContext = useContext(UserContext)

  return (
    <nav className="header">
      <div className="logo" onClick={() => navigate("/")}>
        TCOMMERCE
      </div>

      <SearchBar />
      
      <div className="item cart" onClick={() => navigate("/cart/")}>
      <Badge color="secondary" badgeContent={cartContext.cart.length}
        max={99} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
        <ShoppingCartIcon />
      </Badge>
       
      </div>

      <div className="item user" onClick={() => userContext.logged ? navigate("/profile/") : navigate("/login/")}>
        <PersonIcon sx={{ fontSize: 26 }}/>
      </div>
    </nav>
  )
}

export default Header