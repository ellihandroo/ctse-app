import { useNavigate } from 'react-router-dom'
import AssetHeader from './AssetHeader'
import StatsGrid from './StatsGrid'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatZAR, formatCompact } from '../../utils/formatters'

export default function FuturesDetail({ asset }) {
  const navigate = useNavigate()

  const stats = [
    { label: 'Mark Price', value: formatZAR(asset.markPrice) },
    { label: 'Index Price', value: formatZAR(asset.indexPrice) },
    { label: 'Funding Rate', value: `${(asset.fundingRate * 100).toFixed(4)}%` },
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
    { label: 'Open Interest', value: formatCompact(asset.openInterest) },
    { label: 'Max Leverage', value: `${asset.maxLeverage}x` },
  ]

  const nextFunding = new Date(asset.nextFunding).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="space-y-6">
      <AssetHeader asset={asset} price={asset.markPrice} />

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="error">{asset.maxLeverage}x Leverage</Badge>
        <Badge variant="neutral">Perpetual</Badge>
        <span className="text-xs text-text-muted">
          Next funding: {nextFunding}
        </span>
      </div>

      <StatsGrid stats={stats} />

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          About Perpetual Futures
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Perpetual futures allow you to trade {asset.underlying} with up to {asset.maxLeverage}x leverage.
          Unlike traditional futures, perpetuals have no expiry date. The funding rate mechanism
          keeps the mark price close to the index price.
        </p>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="success"
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/trade/${asset.id}`)}
        >
          Long {asset.symbol}
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/trade/${asset.id}`)}
        >
          Short {asset.symbol}
        </Button>
      </div>
    </div>
  )
}
