import React, { useContext } from 'react'
import '../styles/Header.css'
import { useNavigate } from "react-router-dom"
import { CartContext } from '../contexts/cartContext'
import SearchBar from './SearchBar'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { checkLogged } from '../utils/checkLogged'

const Header = () => {

  const navigate = useNavigate()
  const cartContext = useContext(CartContext)

  const loginFirst = () => {
    toast.error("Hãy đăng nhập để xem giỏ hàng", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  }

  return (
    <nav className="header">
      <div className="logo" onClick={() => navigate("/")}>
        TCOMMERCE
      </div>

      <SearchBar />
      
      <div className="item cart" onClick={() => checkLogged() ? navigate("/cart/") : loginFirst()}>
      <Badge color="secondary" badgeContent={cartContext.cart.quantity_in_cart}
        max={99} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
        <ShoppingCartIcon />
      </Badge>
       
      <ToastContainer newestOnTop={true}/>

      </div>

      <div className="item user" onClick={() => checkLogged() ? navigate("/profile/") : navigate("/login/")}>
        <PersonIcon sx={{ fontSize: 26 }}/>
      </div>
    </nav>
  )
}

export default Header