import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import AssetHeader from './AssetHeader'
import PriceChartPlaceholder from './PriceChartPlaceholder'
import StatsGrid from './StatsGrid'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatZAR, formatUSD, formatCompact, formatAPY } from '../../utils/formatters'

export default function CryptoDetail({ asset }) {
  const navigate = useNavigate()

  const stats = [
    { label: 'Price (USD)', value: formatUSD(asset.priceUSD) },
    { label: 'Market Cap', value: formatCompact(asset.marketCap) },
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
  ]

  if (asset.apy) {
    stats.push({ label: 'APY', value: formatAPY(asset.apy) })
  }

  return (
    <div className="space-y-6">
      <AssetHeader asset={asset} price={asset.price} />

      <div className="flex items-center gap-2 flex-wrap">
        {!asset.isStablecoin && (
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3 h-3" />
            24/7 Trading
          </span>
        )}
        {asset.isStablecoin && <Badge variant="neutral">Stablecoin</Badge>}
        {asset.apy && <Badge variant="success">{formatAPY(asset.apy)}</Badge>}
        {asset.apySource && (
          <span className="text-xs text-text-muted">{asset.apySource}</span>
        )}
      </div>

      <PriceChartPlaceholder data={asset.sparkline} />
      <StatsGrid stats={stats} />

      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/trade/${asset.id}`)}
        >
          Buy {asset.symbol}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/trade/${asset.id}`)}
        >
          Sell {asset.symbol}
        </Button>
      </div>
    </div>
  )
}
