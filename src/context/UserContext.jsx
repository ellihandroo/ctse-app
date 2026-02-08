import { createContext, useContext, useState, useCallback } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback((userData) => {
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = { user, login, logout, isLoggedIn: user !== null }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
