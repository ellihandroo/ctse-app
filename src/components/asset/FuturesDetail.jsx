import { useState } from 'react'
import AssetHeader from './AssetHeader'
import PriceChart from './PriceChart'
import KeyStatistics from './KeyStatistics'
import Card from '../common/Card'
import Badge from '../common/Badge'
import { formatZAR, formatCompact } from '../../utils/formatters'

export default function FuturesDetail({ asset, headerActions }) {
  const [hoverInfo, setHoverInfo] = useState(null)

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
      <AssetHeader
        asset={asset}
        price={asset.markPrice}
        hoveredPrice={hoverInfo?.price}
        hoveredTime={hoverInfo?.time}
        actions={headerActions}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="error">{asset.maxLeverage}x Leverage</Badge>
        <Badge variant="neutral">Perpetual</Badge>
        <span className="text-xs text-text-muted">
          Next funding: {nextFunding}
        </span>
      </div>

      <PriceChart
        sparkline={asset.sparkline}
        currentPrice={asset.markPrice}
        assetId={asset.id}
        change24h={asset.change24h}
        onHover={setHoverInfo}
      />

      <KeyStatistics stats={stats} defaultVisible={4} />

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
    </div>
  )
}
