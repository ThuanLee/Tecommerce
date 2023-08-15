import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/SignupPage.css'
import { signup } from '../services/userService'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Flip } from 'react-toastify'

const SignupPage = () => {

  const navigate = useNavigate()

  const errorSignupToast = (message) => {
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

  const successSignupToast = (message) => {
    toast.success(message, {
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
    const email = e.target.email.value
    const password = e.target.password.value
    const repassword = e.target.repassword.value

    if (username.length < 8) {
      errorSignupToast("Tên đăng nhập phải có ít nhất 8 ký tự")
      return
    }

    if (password !== repassword) {
      errorSignupToast('Mật khẩu nhập lại không trùng khớp')
      return
    }

    const response = await signup(username, email, password)
    if (response === "username exists") {
      errorSignupToast('Tên đăng nhập đã được sử dụng')
    } else if (response === "email exists") {
      errorSignupToast('Email này đã được đăng ký bởi một tài khoản khác')
    } else if (response === "signup success") {
      setTimeout(() => navigate('/login/'), 3000)
      successSignupToast('Đăng ký thành công')
    }
  }

  return (
    <div class="signup-page">
      <ToastContainer newestOnTop={true}/>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit} autoComplete="off" spellCheck={false}>
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
          <input type="checkbox" required/>
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