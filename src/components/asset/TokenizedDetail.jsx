import { useState } from 'react'
import { MapPin, Shield } from 'lucide-react'
import AssetHeader from './AssetHeader'
import PriceChart from './PriceChart'
import KeyStatistics from './KeyStatistics'
import AboutSection from './AboutSection'
import RelatedLists from './RelatedLists'
import NewsSection from './NewsSection'
import Badge from '../common/Badge'
import { formatAPY, formatCompact, formatNumber } from '../../utils/formatters'
import { tokenizedNews } from '../../data/news'

export default function TokenizedDetail({ asset }) {
  const [hoverInfo, setHoverInfo] = useState(null)

  const stats = [
    { label: 'Valuation', value: asset.valuation ? formatCompact(asset.valuation) : '-' },
    { label: 'Annual Yield', value: formatAPY(asset.annualYield) },
    { label: 'Available Tokens', value: formatNumber(asset.availableTokens) },
    { label: 'Total Tokens', value: formatNumber(asset.totalTokens) },
  ]

  if (asset.occupancyRate) {
    stats.push({ label: 'Occupancy', value: `${asset.occupancyRate}%` })
  }
  if (asset.couponRate) {
    stats.push({ label: 'Coupon Rate', value: `${asset.couponRate}%` })
  }
  if (asset.maturityDate) {
    stats.push({ label: 'Maturity', value: new Date(asset.maturityDate).toLocaleDateString('en-ZA') })
  }

  const news = tokenizedNews.filter((n) => n.assetId === asset.id)

  return (
    <div className="space-y-6">
      <AssetHeader
        asset={asset}
        price={asset.tokenPrice}
        hoveredPrice={hoverInfo?.price}
        hoveredTime={hoverInfo?.time}
      />

      {/* Yield + Chain badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="success">{formatAPY(asset.annualYield)}</Badge>
        {asset.chain && (
          <Badge variant="neutral">
            <Shield className="w-3 h-3 mr-1" />
            {asset.chain}
          </Badge>
        )}
        {asset.category && <Badge variant="primary">{asset.category}</Badge>}
        {asset.location && (
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <MapPin className="w-3 h-3" />
            {asset.location}
          </span>
        )}
      </div>

      <PriceChart
        sparkline={asset.sparkline}
        currentPrice={asset.tokenPrice}
        assetId={asset.id}
        change24h={asset.change24h}
        onHover={setHoverInfo}
      />

      <KeyStatistics stats={stats} defaultVisible={4} />

      <AboutSection
        title={`About ${asset.name}`}
        description={asset.description}
        details={asset.assetDetails}
      />

      <RelatedLists lists={asset.relatedLists} />
      <NewsSection news={news} />
    </div>
  )
}
