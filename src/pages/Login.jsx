import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { users } from '../data/users'
import { Shield, TrendingUp, Landmark, Globe } from 'lucide-react'
import Badge from '../components/common/Badge'
import Card from '../components/common/Card'
import { formatZAR } from '../utils/formatters'

const typeLabels = {
  retail: { label: 'Retail', variant: 'primary' },
  hnw: { label: 'High Net Worth', variant: 'success' },
  institutional: { label: 'Institutional', variant: 'dark' },
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()

  const handleLogin = (user) => {
    login(user)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo + Tagline */}
      <div className="text-center mb-8">
        <img
          src="/ctse-full-logo.svg"
          alt="Cape Town Stock Exchange"
          className="h-20 sm:h-24 mx-auto mb-4"
        />
        <p className="text-lg text-text-secondary mb-2">
          The Everything Exchange
        </p>
        <p className="text-sm text-text-muted max-w-md">
          Trade equities, tokenized real-world assets, crypto, prediction markets, and perpetual futures — all in one place.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { icon: TrendingUp, label: 'Equities' },
          { icon: Landmark, label: 'Tokenized RWA' },
          { icon: Globe, label: 'Crypto' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-full text-sm text-text-secondary"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </div>
        ))}
      </div>

      {/* FSCA Badge */}
      <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-primary-light rounded-full">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          FSCA Regulated Exchange
        </span>
      </div>

      {/* Demo accounts */}
      <div className="w-full max-w-lg">
        <p className="text-sm text-text-muted text-center mb-4">
          Select a demo account to explore
        </p>
        <div className="space-y-3">
          {users.map((user) => {
            const typeInfo = typeLabels[user.type]
            return (
              <Card
                key={user.id}
                hover
                onClick={() => handleLogin(user)}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {user.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-text-primary">
                      {user.name}
                    </span>
                    <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                  </div>
                  <p className="text-sm text-text-muted">{user.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono font-semibold text-text-primary">
                    {formatZAR(user.portfolioValue)}
                  </p>
                  <p className="text-xs text-text-muted">Portfolio</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-text-muted">
        <p>Cape Town Stock Exchange &copy; 2026</p>
        <p className="mt-1">Demo application — no real trading</p>
      </div>
    </div>
  )
}
