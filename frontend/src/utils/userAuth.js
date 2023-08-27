import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import { endSessionToast } from './toast';

// Return user id if refresh token still available, or return false
export const checkLogged = () => {
  let token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    const refresh = jwt_decode(token.refresh)
    // Refresh token expire in 2 miliseconds
    const isExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1
    if (!isExpired) {
      return true
    }
  }
  return false
}

// Get user id from access token
export const getUserId = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const userId = jwt_decode(token.access).user_id
  return userId
}


// Custom hook to end session
export const useEndSession = () => {
  const navigate = useNavigate()
  const cartContext = useContext(CartContext)
  return () => {
    endSessionToast()
    cartContext.setCart([])
    navigate('/login/')
  }
}