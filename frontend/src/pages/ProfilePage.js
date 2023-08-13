import React, { useContext, useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/userService';
import jwt_decode from "jwt-decode";

const ProfilePage = () => {

  const navigate = useNavigate()
  const context = useContext(UserContext)

  const [profile, setProfile] = useState([])

  useEffect(() => {
    const callAPI = async() => {
      const token = JSON.parse(localStorage.getItem('token'))
      const userId = jwt_decode(token.access).user_id
      try {
        let data = await getProfile(userId)
        setProfile(data)
      } catch (error) {
        if (error.response.data.detail === "Authentication credentials were not provided.") {
          navigate('/login/')
        }
      }
    }
    callAPI()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    context.setLogged(false)
    navigate('/login/')
  }

  return (
    <div className='profile-page container'>
      <div className='row'>
        <h1 className='col-lg-10'>Trang cá nhân</h1>
        <div className='logout-btn col-lg-2' onClick={logout}> 
          <LogoutIcon sx={{ fontSize: 36 }} />
        </div>
      </div>
      <div className='fullname row'>
        <h3 className='col-lg-2'>
          Họ và tên:
        </h3>
        <p className='col-lg-4'>{profile.fullname}</p>
      </div>
      <div className='email row'>
        <h3 className='col-lg-2'>
          Email:
        </h3>
        <p className='col-lg-4'>{profile.email}</p>
      </div>
      <div className='phone-number row'>
        <h3 className='col-lg-2'>
          Số điện thoại:
        </h3>
        <p className='col-lg-4'>{profile.phone_number}</p>
      </div>
      <div className='address row'>
        <h3 className='col-lg-2'>
          Địa chỉ:
        </h3>
        <p className='col-lg-4'>{profile.address}</p>
      </div>
    </div>
  )
}

export default ProfilePage