import { useState } from 'react'
import AssetHeader from './AssetHeader'
import PriceChart from './PriceChart'
import KeyStatistics from './KeyStatistics'
import AboutSection from './AboutSection'
import RelatedLists from './RelatedLists'
import NewsSection from './NewsSection'
import AnalystRatings from './AnalystRatings'
import { formatCompact, formatAPY } from '../../utils/formatters'
import { announcements } from '../../data/corporate'

export default function EquityDetail({ asset }) {
  const [hoverInfo, setHoverInfo] = useState(null)

  const stats = [
    { label: 'Market Cap', value: formatCompact(asset.marketCap) },
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
    { label: 'P/E Ratio', value: asset.pe?.toFixed(1) || '-' },
    { label: 'Div. Yield', value: asset.dividendYield ? formatAPY(asset.dividendYield) : '-' },
    { label: 'Sector', value: asset.sector },
  ]

  const news = announcements
    .filter((a) => a.symbol === asset.symbol)
    .map((a) => ({
      id: a.id,
      source: a.category,
      date: a.timestamp,
      headline: a.title,
      snippet: a.body,
    }))

  return (
    <div className="space-y-6">
      <AssetHeader
        asset={asset}
        price={asset.price}
        hoveredPrice={hoverInfo?.price}
        hoveredTime={hoverInfo?.time}
      />
      <PriceChart
        sparkline={asset.sparkline}
        currentPrice={asset.price}
        assetId={asset.id}
        change24h={asset.change24h}
        onHover={setHoverInfo}
      />

      <KeyStatistics stats={stats} />

      <AboutSection
        title={`About ${asset.name}`}
        description={asset.description}
        details={asset.companyDetails}
      />

      <RelatedLists lists={asset.relatedLists} />
      <NewsSection news={news} />
      <AnalystRatings ratings={asset.analystRatings} />
    </div>
  )
}
