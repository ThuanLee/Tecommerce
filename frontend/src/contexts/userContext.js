import React, { createContext, useState } from 'react'

// Initiate Context
const UserContext = createContext();

// Provide Context
const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('user') ? true : false));

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }