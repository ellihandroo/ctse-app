import { useUser } from '../context/UserContext'
import { formatZAR } from '../utils/formatters'
import Card from '../components/common/Card'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Here&apos;s your portfolio overview
        </p>
      </div>

      <Card>
        <p className="text-sm text-text-secondary mb-1">Total Portfolio Value</p>
        <p className="text-3xl font-bold font-mono text-text-primary">
          {formatZAR(user?.portfolioValue || 0)}
        </p>
        <p className="text-sm text-success font-medium mt-1">+R12,450 (+1.5%) today</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-sm text-text-secondary">Equities</p>
          <p className="text-xl font-bold font-mono mt-1">R340,000</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-text-secondary">Crypto</p>
          <p className="text-xl font-bold font-mono mt-1">R285,000</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-text-secondary">Tokenized</p>
          <p className="text-xl font-bold font-mono mt-1">R222,500</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-3">Recent Activity</h2>
        <p className="text-sm text-text-muted">Full dashboard coming in Phase 2...</p>
      </Card>
    </div>
  )
}
