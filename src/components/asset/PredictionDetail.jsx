import { Timer } from 'lucide-react'
import AssetHeader from './AssetHeader'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatZAR, formatCompact } from '../../utils/formatters'

function daysUntil(dateStr) {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function PredictionDetail({ asset }) {
  const days = daysUntil(asset.expiryDate)
  const yesPercent = (asset.yesPrice * 100).toFixed(0)
  const noPercent = (asset.noPrice * 100).toFixed(0)

  return (
    <div className="space-y-6">
      {/* Header — predictions don't have a simple price */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="warning">{asset.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-text-muted">
            <Timer className="w-3.5 h-3.5" />
            {days > 0 ? `Expires in ${days} days` : 'Expired'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          {asset.title}
        </h1>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          {asset.description}
        </p>
      </div>

      {/* Outcome bars */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Current Odds
        </h3>
        <div className="space-y-4">
          {/* YES */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-success">YES</span>
              <span className="text-sm font-mono font-medium text-success">
                {yesPercent}c ({yesPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${yesPercent}%` }}
              />
            </div>
          </div>

          {/* NO */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-error">NO</span>
              <span className="text-sm font-mono font-medium text-error">
                {noPercent}c ({noPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-error rounded-full transition-all duration-500"
                style={{ width: `${noPercent}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Market Info</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-text-muted mb-0.5">24h Volume</p>
            <p className="text-sm font-semibold font-mono">{formatCompact(asset.volume24h)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Total Volume</p>
            <p className="text-sm font-semibold font-mono">{formatCompact(asset.totalVolume)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Liquidity</p>
            <p className="text-sm font-semibold font-mono">{formatCompact(asset.liquidity)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Expiry Date</p>
            <p className="text-sm font-semibold">
              {new Date(asset.expiryDate).toLocaleDateString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </Card>

      {/* Buy buttons */}
      <div className="flex gap-3">
        <Button variant="success" size="lg" className="flex-1">
          Buy YES at {yesPercent}c
        </Button>
        <Button variant="danger" size="lg" className="flex-1">
          Buy NO at {noPercent}c
        </Button>
      </div>
    </div>
  )
}
