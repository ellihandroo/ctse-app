import { NavLink, useLocation } from 'react-router-dom'
import {
  TrendingUp,
  PiggyBank,
  CreditCard,
  Landmark,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const primaryTabs = [
  { to: '/my-assets', label: 'Assets', icon: TrendingUp },
  { to: '/earn', label: 'Earn', icon: PiggyBank },
  { to: '/card', label: 'Card', icon: CreditCard },
]

const moreItems = [
  { to: '/corporate', label: 'Corporate', icon: Landmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const moreRoutes = moreItems.map((item) => item.to)

export default function MobileNav() {
  const [showMore, setShowMore] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef(null)
  const isMoreActive = moreRoutes.includes(pathname)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMore(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden" ref={menuRef}>
      {/* More panel — slides up from tab bar */}
      {showMore && (
        <div className="bg-white border-t border-border px-4 py-3">
          <div className="flex gap-2">
            {moreItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setShowMore(false)}
                className={({ isActive }) =>
                  `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'bg-surface text-text-secondary'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="bg-white border-t border-border flex items-center justify-evenly px-4 safe-area-bottom">
        {primaryTabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setShowMore(false)}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 pt-3 pb-2 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-muted'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className={`flex flex-col items-center gap-1 px-2 pt-3 pb-2 text-[10px] font-medium transition-colors ${
            showMore || isMoreActive ? 'text-primary' : 'text-text-muted'
          }`}
        >
          {showMore ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          More
        </button>
      </nav>
    </div>
  )
}
