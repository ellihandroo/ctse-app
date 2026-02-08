import { Search, Bell, ChevronDown, Shield } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Badge from '../common/Badge'

export default function Navbar() {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setShowDropdown(false)
    logout()
    navigate('/')
  }

  return (
    <nav className="h-16 bg-white border-b border-border px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Logo + FSCA */}
      <div className="flex items-center gap-3">
        <img
          src="/ctse-wordmark.svg"
          alt="CTSE"
          className="h-6 sm:h-7"
        />
        <Badge variant="primary" className="hidden sm:flex">
          <Shield className="w-3 h-3 mr-1" />
          FSCA Regulated
        </Badge>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search assets, markets..."
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-surface transition-colors">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface transition-colors"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.initials}
                </span>
              </div>
              <span className="text-sm font-medium text-text-primary hidden lg:block">
                {user.name}
              </span>
              <ChevronDown className="w-4 h-4 text-text-muted hidden lg:block" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface transition-colors"
                  onClick={() => {
                    setShowDropdown(false)
                    navigate('/settings')
                  }}
                >
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface transition-colors"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
