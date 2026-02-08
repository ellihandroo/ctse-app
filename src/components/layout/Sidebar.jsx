import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Wallet,
  CreditCard,
  Building2,
  Settings,
  TrendingUp,
  Landmark,
  PiggyBank,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/marketplace', label: 'Marketplace', icon: Store },
  { to: '/my-assets', label: 'My Assets', icon: TrendingUp },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/earn', label: 'Earn', icon: PiggyBank },
  { to: '/card', label: 'Spend Card', icon: CreditCard },
  { to: '/corporate', label: 'Corporate', icon: Landmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-white h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 py-4 px-3">
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

      {/* Footer badge */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Building2 className="w-4 h-4" />
          <span>Cape Town Stock Exchange</span>
        </div>
      </div>
    </aside>
  )
}
