import React, { createContext, useState } from 'react'
import { useContext } from 'react';

// Initiate Context
const UserContext = createContext();
export const useMyContext = () => useContext(UserContext);

// Provide Context
const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('token') ? true : false));

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }