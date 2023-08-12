import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

  const navigate = useNavigate()
  const context = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('user')
    context.setLogged(false)
    navigate('/login/')
  }

  return (
    <div className='profile-page container'>
      <h1>ProfilePage</h1>
      <div className='logout-btn' onClick={logout}> 
        <LogoutIcon />
      </div>
    </div>
  )
}

export default ProfilePage