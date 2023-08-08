import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/SignupPage.css'

const SignupPage = () => {

  return (
    <div class="signup-page">
      <h2>Đăng ký</h2>
      <form action="#">
        <div class="input-box">
          <input type="text" placeholder="Tên đăng nhập" required/>
        </div>
        <div class="input-box">
          <input type="text" placeholder="Email" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Nhập lại mật khẩu" required/>
        </div>
        <div class="policy">
          <input type="checkbox"/>
          <h3>Tôi chấp nhận mọi điều khoản và hợp đồng</h3>
        </div>
        <div class="input-box button">
          <input type="Submit" value="Đăng ký"/>
        </div>
        <div class="text">
          <h3>Bạn đã có tài khoản? <Link to='/login/'>Đăng nhập ngay</Link></h3>
        </div>
      </form>
    </div>
  )
}

export default SignupPage