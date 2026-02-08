import { useNavigate } from 'react-router-dom'
import AssetHeader from './AssetHeader'
import PriceChartPlaceholder from './PriceChartPlaceholder'
import StatsGrid from './StatsGrid'
import Card from '../common/Card'
import Button from '../common/Button'
import { formatCompact, formatAPY } from '../../utils/formatters'

export default function EquityDetail({ asset }) {
  const navigate = useNavigate()

  const stats = [
    { label: 'Market Cap', value: formatCompact(asset.marketCap) },
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
    { label: 'P/E Ratio', value: asset.pe?.toFixed(1) || '-' },
    { label: 'Div. Yield', value: asset.dividendYield ? formatAPY(asset.dividendYield) : '-' },
  ]

  return (
    <div className="space-y-6">
      <AssetHeader asset={asset} price={asset.price} />
      <PriceChartPlaceholder data={asset.sparkline} />
      <StatsGrid stats={stats} />

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">About</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {asset.description}
        </p>
        <p className="text-xs text-text-muted mt-2">Sector: {asset.sector}</p>
      </Card>

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
