import React, { createContext, useState } from 'react'
import { checkLogged } from '../utils/userAuth';

// Initiate Context
const UserContext = createContext();

// Provide Context
const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(checkLogged());

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }