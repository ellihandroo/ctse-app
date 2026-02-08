import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
