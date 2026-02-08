import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  TrendingUp,
} from 'lucide-react'
import Card from '../common/Card'
import { formatZAR } from '../../utils/formatters'

const typeConfig = {
  buy: { icon: ArrowDownLeft, color: 'text-success', bg: 'bg-green-50', label: 'Bought' },
  sell: { icon: ArrowUpRight, color: 'text-error', bg: 'bg-red-50', label: 'Sold' },
  dividend: { icon: Coins, color: 'text-primary', bg: 'bg-primary-light', label: 'Dividend' },
  yield: { icon: TrendingUp, color: 'text-primary', bg: 'bg-primary-light', label: 'Yield earned' },
}

export default function RecentActivity({ activities }) {
  return (
    <Card padding="p-0">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const config = typeConfig[activity.type]
          const Icon = config.icon
          const isIncome = activity.type === 'buy' || activity.type === 'dividend' || activity.type === 'yield'
          return (
            <div key={activity.id} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  {config.label}{' '}
                  <span className="font-medium">{activity.asset}</span>
                  {activity.amount != null && (
                    <span className="text-text-muted"> ({activity.amount})</span>
                  )}
                </p>
                <p className="text-xs text-text-muted">{activity.time}</p>
              </div>
              <span className={`text-sm font-mono font-medium ${isIncome && activity.type !== 'buy' ? 'text-success' : 'text-text-primary'}`}>
                {activity.type === 'sell' ? '+' : activity.type === 'buy' ? '-' : '+'}
                {formatZAR(activity.value)}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
