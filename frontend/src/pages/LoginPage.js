import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/LoginPage.css'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Flip } from 'react-toastify'
import { login } from '../services/userService'
import { UserContext } from '../contexts/userContext'
import { CartContext } from '../contexts/cartContext'
import { getCart } from '../services/cartSevice';
import jwt_decode from 'jwt-decode';


const LoginPage = () => {

  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)

  const loginToast = (message) => {
      toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      transition: Flip,
      theme: "light",
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    const response = await login(username, password)

    if (response === "username not match") {
      loginToast("Tên đăng nhập không đúng")
    } else if (response === "password not match") {
      loginToast("Mật khẩu không đúng")
    } else {
      localStorage.setItem('token', JSON.stringify(response))
      const userId = jwt_decode(response.access).user_id
      userContext.setLogged(userId)
      cartContext.setCart(await getCart(userId))
      navigate('/profile/')
    }
  }

  return (
    <div class="login-page">
      <ToastContainer newestOnTop={true}/>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit} autoComplete="off" spellCheck={false}>
        <div class="input-box">
          <input type="text" placeholder="Tên đăng nhập" name="username" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" name="password" required/>
        </div>
        <div class="remember-password">
          <input type="checkbox"/>
          <h3>Lưu tài khoản</h3>
        </div>
        <div class="input-box button">
          <input type="Submit" value="Đăng nhập"/>
        </div>
        <div class="text">
          <h3>Bạn chưa có tài khoản? <Link to='/signup/'>Đăng ký ngay</Link></h3>
        </div>
      </form>
    </div>
  )
}

export default LoginPage