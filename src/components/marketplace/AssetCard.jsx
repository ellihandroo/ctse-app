import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import PriceChange from '../common/PriceChange'
import Sparkline from '../common/Sparkline'
import { formatZAR, formatAPY, formatCompact } from '../../utils/formatters'

const typeConfig = {
  equity: { label: 'Equity', variant: 'neutral' },
  tokenized: { label: 'Tokenized', variant: 'primary' },
  crypto: { label: 'Crypto', variant: 'dark' },
  prediction: { label: 'Prediction', variant: 'warning' },
  futures: { label: 'Futures', variant: 'error' },
}

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
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
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-primary">
            {getInitials(asset.name)}
          </span>
        </div>
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
            <Badge variant={config.variant}>{config.label}</Badge>
            {asset.assetType === 'crypto' && !asset.isStablecoin && (
              <span className="flex items-center gap-0.5 text-xs text-text-muted">
                <Clock className="w-3 h-3" />
                24/7
              </span>
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
            <span>Vol: {formatCompact(volume)}</span>
            <span>Expires {new Date(asset.expiryDate).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Price row + sparkline */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold font-mono text-text-primary">
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
