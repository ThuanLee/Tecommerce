import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { checkLogged } from './userAuth'

const LoggedRoute = () => {
  return (
    checkLogged() ? <Outlet /> : <Navigate to='/login/' />
  )
}

const UnLoggedRoute = () => {
  return (
    (!checkLogged()) ? <Outlet /> : <Navigate to='/profile/' />
  )
}

export {LoggedRoute, UnLoggedRoute}