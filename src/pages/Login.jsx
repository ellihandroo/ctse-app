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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo + Tagline */}
      <div className="text-center mb-6">
        <img
          src="/ctse-full-logo.svg"
          alt="Cape Town Stock Exchange"
          className="h-16 sm:h-24 mx-auto mb-3"
        />
        <p className="text-lg text-text-secondary mb-1">
          The Everything Exchange
        </p>
        <p className="text-sm text-text-muted max-w-sm mx-auto">
          Trade equities, tokenized assets, crypto, predictions, and futures — all in one place.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[
          { icon: TrendingUp, label: 'Equities' },
          { icon: Landmark, label: 'Tokenized RWA' },
          { icon: Globe, label: 'Crypto' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-text-secondary"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </div>
        ))}
      </div>

      {/* FSCA Badge */}
      <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-primary-light rounded-full">
        <Shield className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">
          FSCA Regulated Exchange
        </span>
      </div>

      {/* Demo accounts */}
      <div className="w-full max-w-sm">
        <p className="text-xs text-text-muted text-center mb-3">
          Select a demo account to explore
        </p>
        <div className="space-y-2">
          {users.map((user) => {
            const typeInfo = typeLabels[user.type]
            return (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full flex items-center gap-3 p-3 bg-surface border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    {user.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-primary truncate">
                      {user.name}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-muted">{user.email}</span>
                    <span className="text-xs font-mono font-medium text-text-secondary">
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
      <div className="mt-8 text-center text-[11px] text-text-muted">
        <p>Cape Town Stock Exchange &copy; 2026</p>
        <p className="mt-0.5">Demo application — no real trading</p>
      </div>
    </div>
  )
}
