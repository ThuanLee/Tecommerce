import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/SignupPage.css'
import { signup } from '../services/userService'

const SignupPage = () => {

  const handleSubmit = async(e) => {
    e.preventDefault()
    let username = e.target.username.value
    let email = e.target.email.value
    let password = e.target.password.value
    let repassword = e.target.repassword.value

    if (username !== 'admin' && username.length < 8) {
      console.log('ngan qua')
      return
    }
    if (password !== repassword) {
      console.log('mat khau khong trung khop')
      return
    }

    let response = await signup(username, email, password)
    if (response === "username exists") {
      console.log('ten nguoi dung da ton tai')
    } else if (response === "email exists") {
      console.log('email da duoc su dung')
    } else if (response === "signup success") {
      console.log('dang ky thanh cong')
    }
  }


  return (
    <div class="signup-page">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div class="input-box">
          <input type="text" placeholder="Tên đăng nhập" name="username" required/>
        </div>
        <div class="input-box">
          <input type="email" placeholder="Email" name="email" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" name="password" required/>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Nhập lại mật khẩu" name="repassword" required/>
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