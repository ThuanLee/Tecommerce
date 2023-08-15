import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import React, { createContext, useState } from 'react'
import { useContext } from 'react';

// Initiate Context
const UserContext = createContext();
export const useMyContext = () => useContext(UserContext);

// Provide Context
const UserProvider = ({ children }) => {
  let stillLogged = false
  let token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    const refresh = jwtDecode(token.refresh)
    const isExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1
    if (!isExpired) {
      stillLogged = true
    }
  }
  const [logged, setLogged] = useState(stillLogged);

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }