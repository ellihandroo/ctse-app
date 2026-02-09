import { useNavigate } from 'react-router-dom'
import { Clock, Timer, Users } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import PriceChange from '../common/PriceChange'
import Sparkline from '../common/Sparkline'
import AssetIcon from '../common/AssetIcon'
import { formatZAR, formatAPY, formatCompact, formatNumber } from '../../utils/formatters'

function daysUntil(dateStr) {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const typeConfig = {
  equity: { label: 'Equity', variant: 'neutral' },
  tokenized: { label: 'Tokenized', variant: 'primary' },
  crypto: { label: 'Crypto', variant: 'dark' },
  prediction: { label: 'Prediction', variant: 'warning' },
  futures: { label: 'Futures', variant: 'error' },
}

function getPrice(asset) {
  if (asset.assetType === 'prediction') return null
  if (asset.assetType === 'futures') return asset.markPrice
  return asset.tokenPrice || asset.price
}

function getChange(asset) {
  return asset.change24h ?? 0
}

function getYield(asset) {
  return asset.annualYield || asset.apy || asset.dividendYield || null
}

function getSparkline(asset) {
  return asset.sparkline || null
}

function getVolume(asset) {
  return asset.volume24h || asset.totalVolume || null
}

export default function AssetCard({ asset }) {
  const navigate = useNavigate()
  const config = typeConfig[asset.assetType] || typeConfig.equity
  const price = getPrice(asset)
  const change = getChange(asset)
  const yieldValue = getYield(asset)
  const sparkline = getSparkline(asset)
  const volume = getVolume(asset)
  const symbol = asset.symbol || ''
  const isPrediction = asset.assetType === 'prediction'

  return (
    <Card
      hover
      onClick={() => navigate(`/asset/${asset.id}`)}
      className="flex flex-col gap-3"
    >
      {/* Top row: icon + name + type badge */}
      <div className="flex items-start gap-3">
        <AssetIcon symbol={symbol} name={asset.name || asset.title} size="lg" assetType={asset.assetType} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary truncate">
              {isPrediction ? asset.title : asset.name}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {symbol && (
              <span className="text-xs text-text-muted font-mono">{symbol}</span>
            )}
            {isPrediction ? (
              <>
                <Badge variant="warning">{asset.category}</Badge>
                <span className="flex items-center gap-0.5 text-xs text-text-muted">
                  <Timer className="w-3 h-3" />
                  {daysUntil(asset.expiryDate) > 0
                    ? `${daysUntil(asset.expiryDate)}d left`
                    : 'Expired'}
                </span>
              </>
            ) : (
              <>
                <Badge variant={config.variant}>{config.label}</Badge>
                {asset.assetType === 'crypto' && !asset.isStablecoin && (
                  <span className="flex items-center gap-0.5 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    24/7
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Prediction market layout */}
      {isPrediction ? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-success font-medium">
              YES {(asset.yesPrice * 100).toFixed(0)}c
            </span>
            <span className="text-error font-medium">
              NO {(asset.noPrice * 100).toFixed(0)}c
            </span>
          </div>
          <div className="w-full h-2 bg-error/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full"
              style={{ width: `${asset.yesPrice * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {formatNumber(asset.traders || 0)} traders
            </span>
            <span>Vol {formatCompact(volume)}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Price row + sparkline */}
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-lg font-semibold font-mono text-text-primary truncate">
                {formatZAR(price)}
              </p>
              <PriceChange change={change} />
            </div>
            {sparkline && <Sparkline data={sparkline} width={72} height={28} />}
          </div>

          {/* Bottom row: APY + volume */}
          <div className="flex items-center gap-2 flex-wrap">
            {yieldValue && (
              <Badge variant="success">{formatAPY(yieldValue)}</Badge>
            )}
            {asset.chain && (
              <Badge variant="neutral">{asset.chain}</Badge>
            )}
            {asset.maxLeverage && (
              <Badge variant="error">{asset.maxLeverage}x</Badge>
            )}
            {volume && (
              <span className="text-xs text-text-muted ml-auto">
                Vol {formatCompact(volume)}
              </span>
            )}
          </div>
        </>
      )}
    </Card>
  )
}
