import { createContext, useContext, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev)
  }, [])

  const setDark = useCallback((dark) => {
    setIsDarkMode(dark)
  }, [])

  const value = { isDarkMode, toggleDarkMode, setDark }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
