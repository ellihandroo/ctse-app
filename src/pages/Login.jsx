import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { users } from '../data/users'
import { Shield, TrendingUp, Landmark, Globe, ChevronRight } from 'lucide-react'
import { formatCompact } from '../utils/formatters'

const typeLabels = {
  retail: { label: 'Retail', color: 'text-primary bg-primary-light' },
  hnw: { label: 'HNW', color: 'text-success bg-green-50' },
  institutional: { label: 'Institutional', color: 'text-text-primary bg-gray-100' },
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()

  const handleLogin = (user) => {
    login(user)
    navigate('/marketplace')
  }

  return (
    <div className="h-dvh bg-background flex flex-col items-center justify-between px-4 py-6 overflow-hidden">
      {/* Top spacer */}
      <div />

      {/* Center content */}
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Logo + Tagline */}
        <img
          src="/ctse-full-logo.svg"
          alt="Cape Town Stock Exchange"
          className="h-14 sm:h-20 mb-2"
        />
        <p className="text-base text-text-secondary mb-1">
          The Everything Exchange
        </p>
        <p className="text-xs text-text-muted text-center mb-4">
          Trade equities, tokenized assets, crypto, predictions, and futures — all in one place.
        </p>

        {/* Feature pills + FSCA */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-3">
          {[
            { icon: TrendingUp, label: 'Equities' },
            { icon: Landmark, label: 'Tokenized RWA' },
            { icon: Globe, label: 'Crypto' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1 px-2.5 py-1 bg-surface border border-border rounded-full text-[11px] text-text-secondary"
            >
              <Icon className="w-3 h-3" />
              {label}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-5 px-2.5 py-1 bg-primary-light rounded-full">
          <Shield className="w-3 h-3 text-primary" />
          <span className="text-[11px] font-medium text-primary">
            FSCA Regulated Exchange
          </span>
        </div>

        {/* Demo accounts */}
        <p className="text-[11px] text-text-muted text-center mb-2">
          Select a demo account to explore
        </p>
        <div className="w-full space-y-1.5">
          {users.map((user) => {
            const typeInfo = typeLabels[user.type]
            return (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full flex items-center gap-3 p-2.5 bg-surface border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-primary">
                    {user.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-text-primary truncate">
                      {user.name}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-text-muted">{user.email}</span>
                    <span className="text-[11px] font-mono font-medium text-text-secondary">
                      R {formatCompact(user.portfolioValue)}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-text-muted">
        <p>Cape Town Stock Exchange &copy; 2026</p>
        <p>Demo application — no real trading</p>
      </div>
    </div>
  )
}
