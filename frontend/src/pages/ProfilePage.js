import React, { useContext, useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { UserContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile } from '../services/userService'
import '../styles/ProfilePage.css'
import { CartContext } from '../contexts/cartContext'
import { endSessionToast, errorToast } from '../utils/toast'
import OrderList from '../components/OrderList'

const ProfilePage = () => {

  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)
  
  const [profile, setProfile] = useState([])

  let isEdit = false
  const handleBtn = document.getElementById("edit-profile-btn")
  const fullnameInput = document.getElementById("fullname")
  const emailInput = document.getElementById("email")
  const phoneNumberInput = document.getElementById("phone-number")
  const addressInput = document.getElementById("address")

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (error) {
        if (error.status === 401) {
          logout()
        }
      }
    }
    callAPI()
  }, [])

  const profileHandle = (e) => {
    e.preventDefault()
    if (isEdit) {
      saveProfile()
    } else {
      editProfile()
    }
  }

  const editProfile = () => {
    isEdit = true
    handleBtn.value = "Lưu"
    fullnameInput.disabled = false
    emailInput.disabled = false
    phoneNumberInput.disabled = false
    addressInput.disabled = false
  }

  const saveProfile = async () => {
    try {
      const data = {
        "fullname": fullnameInput.value,
        "email": emailInput.value,
        "phone_number": phoneNumberInput.value,
        "address": addressInput.value
      }

      const isChanged =  profile.fullname !== data.fullname
                        || profile.email !== data.email
                        || profile.phone_number !== data.phone_number
                        || profile.address !== data.address 

      if (isChanged) {
        const response = await updateProfile(data)

        if (response === "email exists") {
          errorToast('Email đã được sử dụng bởi một tài khoản khác');
          return
        } else {
          setProfile(response)
        }
      }
      
    } catch (error) {
      if (error.status === 401) {
        logout()
      }
    }

    isEdit = false
    document.getElementById("edit-profile-btn").value = "Chỉnh sửa"
    fullnameInput.disabled = true
    emailInput.disabled = true
    phoneNumberInput.disabled = true
    addressInput.disabled = true
  }

  const logout = () => {
    cartContext.setCart([])
    endSessionToast()
    navigate('/login/')
  }

  return (
    <div className="profile-page container">
      <div className="main-body">

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3 pt-4">
            <div className="d-flex flex-column align-items-center text-center">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
              <div className="mt-3">
                <h4>{profile.username}</h4>
                <p className="text-muted font-size-sm">Thành viên bạc</p>
              </div>
            </div>
          </div>

          <form className="col-md-8" onSubmit={profileHandle} autoComplete="off" spellCheck={false}>
            <div className="card mb-3">
              <div className="card-body">

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Họ và tên</h6>
                  </div>
                  <input disabled id="fullname" className="col-sm-9" defaultValue={profile.fullname} />
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <input disabled required type='email' id="email" className="col-sm-9" defaultValue={profile.email} />
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Số điện thoại</h6>
                  </div>
                  <input disabled type='tel' id="phone-number" className="col-sm-9" defaultValue={profile.phone_number} />
                </div>
                <hr />
               
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Địa chỉ</h6>
                  </div>
                  <input disabled id="address" className="col-sm-9" defaultValue={profile.address} />
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-11">
                    <input type='submit' id="edit-profile-btn" className="btn btn-info" value="Chỉnh sửa" />
                  </div>
                  <div className='col-sm-1'>
                    <LogoutIcon onClick={logout} />
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>

      <OrderList />
      
    </div>
  )
}

export default ProfilePage