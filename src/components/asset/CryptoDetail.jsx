import { useState } from 'react'
import AssetHeader from './AssetHeader'
import PriceChart from './PriceChart'
import KeyStatistics from './KeyStatistics'
import AboutSection from './AboutSection'
import RelatedLists from './RelatedLists'
import NewsSection from './NewsSection'
import Badge from '../common/Badge'
import { formatUSD, formatCompact, formatAPY } from '../../utils/formatters'
import { cryptoNews } from '../../data/news'

export default function CryptoDetail({ asset, headerActions }) {
  const [hoverInfo, setHoverInfo] = useState(null)

  const stats = [
    { label: 'Price (USD)', value: formatUSD(asset.priceUSD) },
    { label: 'Market Cap', value: formatCompact(asset.marketCap) },
    { label: '24h Volume', value: formatCompact(asset.volume24h) },
  ]

  if (asset.apy) {
    stats.push({ label: 'APY', value: formatAPY(asset.apy) })
  }

  const news = cryptoNews.filter((n) => n.assetId === asset.id)

  return (
    <div className="space-y-6">
      <AssetHeader
        asset={asset}
        price={asset.price}
        hoveredPrice={hoverInfo?.price}
        hoveredTime={hoverInfo?.time}
        actions={headerActions}
      />

      <div className="flex items-center gap-2 flex-wrap">
        {asset.isStablecoin && <Badge variant="neutral">Stablecoin</Badge>}
        {asset.apy && <Badge variant="success">{formatAPY(asset.apy)}</Badge>}
        {asset.apySource && (
          <span className="text-xs text-text-muted">{asset.apySource}</span>
        )}
      </div>

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
        details={asset.protocolDetails}
      />

      <RelatedLists lists={asset.relatedLists} />
      <NewsSection news={news} />
    </div>
  )
}
