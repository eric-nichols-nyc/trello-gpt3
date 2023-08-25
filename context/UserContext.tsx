"use client";
// user context for auth
// import into layout.tsx
import React, { useContext } from "react"
// 1. create context
const UserContext = React.createContext({})
// 2. create custom hook
export const useAuth = () => {
  return useContext(UserContext)
}
// 3. create provider

interface Props {
  children: React.ReactNode
}

export const UserProvider = ({ children }:Props)=> {
  const [authUser, setAuthUser] = React.useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

  // destructuring props
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}