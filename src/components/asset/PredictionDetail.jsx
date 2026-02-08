import { useNavigate } from 'react-router-dom'
import { Timer, Shield, TrendingUp } from 'lucide-react'
import Badge from '../common/Badge'
import PredictionChart from '../predictions/PredictionChart'
import KeyStatistics from './KeyStatistics'
import { formatCompact, formatNumber } from '../../utils/formatters'
import { predictions } from '../../data/predictions'

function daysUntil(dateStr) {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function getRelatedPredictions(current) {
  return predictions.filter(
    (p) => p.id !== current.id && p.category === current.category
  )
}

export default function PredictionDetail({ asset }) {
  const navigate = useNavigate()
  const days = daysUntil(asset.expiryDate)
  const yesPercent = (asset.yesPrice * 100).toFixed(0)
  const noPercent = (asset.noPrice * 100).toFixed(0)
  const related = getRelatedPredictions(asset)

  const stats = [
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
    { label: 'Traders', value: formatNumber(asset.traders) },
    { label: 'Liquidity', value: formatCompact(asset.liquidity) },
    {
      label: 'Expiry',
      value: new Date(asset.expiryDate).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
    { label: 'Total Volume', value: formatCompact(asset.totalVolume) },
    { label: 'Resolution', value: asset.resolutionSource },
  ]

  return (
    <div className="space-y-6">
      {/* Header: category badge + countdown + title + description */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="warning">{asset.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-text-muted">
            <Timer className="w-3.5 h-3.5" />
            {days > 0 ? `${days}d left` : 'Expired'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          {asset.title}
        </h1>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          {asset.description}
        </p>
      </div>

      {/* Prediction chart — YES/NO odds evolution */}
      {asset.sparkline && (
        <div>
          <PredictionChart
            sparkline={asset.sparkline}
            yesPrice={asset.yesPrice}
            assetId={asset.id}
            createdDate={asset.createdDate}
            height={240}
          />
          <div className="flex items-center justify-between mt-3 px-1 text-xs text-text-muted">
            <span>Vol 24h: {formatCompact(asset.volume24h)}</span>
            <span>
              Expires:{' '}
              {new Date(asset.expiryDate).toLocaleDateString('en-ZA', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      )}

      {/* YES / NO outcome blocks */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-success/10 p-4 text-center">
          <p className="text-xs font-medium text-success uppercase tracking-wide mb-1">
            Yes
          </p>
          <p className="text-3xl font-bold font-mono text-success">
            {yesPercent}
            <span className="text-lg">c</span>
          </p>
          <p className="text-xs text-text-muted mt-1">{yesPercent}% chance</p>
        </div>
        <div className="rounded-xl bg-error/10 p-4 text-center">
          <p className="text-xs font-medium text-error uppercase tracking-wide mb-1">
            No
          </p>
          <p className="text-3xl font-bold font-mono text-error">
            {noPercent}
            <span className="text-lg">c</span>
          </p>
          <p className="text-xs text-text-muted mt-1">{noPercent}% chance</p>
        </div>
      </div>

      {/* Key Statistics (reused component) */}
      <KeyStatistics stats={stats} defaultVisible={6} />

      {/* Resolution criteria */}
      {asset.resolutionCriteria && (
        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-text-primary">
              Resolution Criteria
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {asset.resolutionCriteria}
          </p>
          <p className="text-xs text-text-muted mt-2">
            Source: {asset.resolutionSource}
          </p>
        </div>
      )}

      {/* Related predictions */}
      {related.length > 0 && (
        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-text-primary">
              Related Markets
            </h3>
          </div>
          <div className="space-y-2">
            {related.map((pred) => {
              const pYes = (pred.yesPrice * 100).toFixed(0)
              const pDays = daysUntil(pred.expiryDate)
              return (
                <button
                  key={pred.id}
                  onClick={() => navigate(`/asset/${pred.id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {pred.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {pDays > 0 ? `${pDays}d left` : 'Expired'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-mono font-semibold text-success">
                      {pYes}c
                    </span>
                    <div className="w-16 h-1.5 bg-error/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success rounded-full"
                        style={{ width: `${pYes}%` }}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
