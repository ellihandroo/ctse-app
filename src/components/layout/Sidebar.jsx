import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {
  CreditCard,
  TrendingUp,
  Landmark,
  PiggyBank,
  Shield,
  ChevronDown,
  LogOut,
} from 'lucide-react'
import { useUser } from '../../context/UserContext'

const navItems = [
  { to: '/my-assets', label: 'My Assets', icon: TrendingUp },
  { to: '/earn', label: 'Earn', icon: PiggyBank },
  { to: '/card', label: 'Spend Card', icon: CreditCard },
  { to: '/corporate', label: 'Corporate', icon: Landmark },
]

export default function Sidebar() {
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
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-white sticky top-16 h-[calc(100vh-4rem)]">
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer: FSCA + User Profile */}
      <div className="px-3 py-3 border-t border-border space-y-3">
        <div className="flex items-center gap-3 px-3 py-1">
          <Shield className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary">FSCA Regulated</p>
            <p className="text-[11px] text-text-muted">Cape Town Stock Exchange</p>
          </div>
        </div>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">
                  {user.initials}
                </span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                <p className="text-[11px] text-text-muted truncate">{user.email}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
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
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-error hover:bg-surface transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
