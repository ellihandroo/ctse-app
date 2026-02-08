import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Wallet,
  TrendingUp,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import {
  CreditCard,
  Landmark,
  Settings,
  PiggyBank,
  X,
} from 'lucide-react'

const primaryTabs = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/marketplace', label: 'Market', icon: Store },
  { to: '/my-assets', label: 'Assets', icon: TrendingUp },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
]

const moreItems = [
  { to: '/earn', label: 'Earn', icon: PiggyBank },
  { to: '/card', label: 'Spend Card', icon: CreditCard },
  { to: '/corporate', label: 'Corporate', icon: Landmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function MobileNav() {
  const [showMore, setShowMore] = useState(false)

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMore(false)}
          />
          <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-border rounded-t-2xl p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-primary">More</span>
              <button onClick={() => setShowMore(false)}>
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moreItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setShowMore(false)}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-surface text-sm text-text-secondary"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex items-center justify-around px-2 z-30 lg:hidden">
        {primaryTabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-muted'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
        <button
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <Menu className="w-5 h-5" />
          More
        </button>
      </nav>
    </>
  )
}
