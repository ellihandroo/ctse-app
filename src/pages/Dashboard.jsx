import { useNavigate } from 'react-router-dom'
import { ArrowDownLeft, Send, TrendingUp } from 'lucide-react'
import { useUser } from '../context/UserContext'
import PortfolioValue from '../components/dashboard/PortfolioValue'
import PortfolioChart from '../components/dashboard/PortfolioChart'
import AssetList from '../components/dashboard/AssetList'
import RecentActivity from '../components/dashboard/RecentActivity'
import Button from '../components/common/Button'
import { portfolioBreakdown, holdings, recentActivity } from '../data/portfolio'

export default function Dashboard() {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Here&apos;s your portfolio overview
        </p>
      </div>

      {/* Portfolio Value */}
      <PortfolioValue totalValue={user?.portfolioValue || 847500} />

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="primary" size="sm">
          <ArrowDownLeft className="w-4 h-4" />
          Deposit
        </Button>
        <Button variant="secondary" size="sm">
          <Send className="w-4 h-4" />
          Send
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/marketplace')}
        >
          <TrendingUp className="w-4 h-4" />
          Trade
        </Button>
      </div>

      {/* Charts + Activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart data={portfolioBreakdown} />
        <RecentActivity activities={recentActivity} />
      </div>

      {/* Holdings */}
      <AssetList holdings={holdings} />
    </div>
  )
}
