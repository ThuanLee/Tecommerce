import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'

const LoginPage = () => {
  return (
    <div class="login-page">
      <h2>Đăng nhập</h2>
      <form action="#">
        <div class="input-box">
          <input type="text" placeholder="Tên đăng nhập" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" required/>
        </div>
        <div class="policy">
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