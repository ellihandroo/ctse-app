import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Card from '../common/Card'
import { formatZAR, formatUSD } from '../../utils/formatters'

export default function PortfolioValue({ totalValue }) {
  const [showUSD, setShowUSD] = useState(false)
  const change = 12450
  const changePercent = 1.49
  const usdRate = 18.72

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">Total Portfolio Value</p>
          <p className="text-3xl sm:text-4xl font-bold font-mono text-text-primary">
            {showUSD ? formatUSD(totalValue / usdRate) : formatZAR(totalValue)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
              <ArrowUpRight className="w-4 h-4" />
              {formatZAR(change)} (+{changePercent.toFixed(2)}%)
            </span>
            <span className="text-xs text-text-muted">today</span>
          </div>
        </div>
        <button
          onClick={() => setShowUSD((prev) => !prev)}
          className="px-3 py-1.5 text-xs font-medium bg-surface border border-border rounded-lg hover:bg-gray-100 transition-colors"
        >
          {showUSD ? 'ZAR' : 'USD'}
        </button>
      </div>
    </Card>
  )
}
