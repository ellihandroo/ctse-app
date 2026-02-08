import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Flame, Sparkles } from 'lucide-react'
import FilterTabs from '../components/marketplace/FilterTabs'
import SearchBar from '../components/marketplace/SearchBar'
import AssetCard from '../components/marketplace/AssetCard'
import PriceChange from '../components/common/PriceChange'
import { equities } from '../data/equities'
import { tokenizedAssets } from '../data/tokenizedAssets'
import { crypto } from '../data/crypto'
import { predictions } from '../data/predictions'
import { perpetuals } from '../data/perpetuals'
import { formatZAR, formatCompact } from '../utils/formatters'

const allAssets = [
  ...equities,
  ...tokenizedAssets,
  ...crypto,
  ...predictions,
  ...perpetuals,
]

/* Tradeable assets only (have a price + change24h) */
const tradeable = allAssets.filter(
  (a) => a.assetType !== 'prediction' && !a.isStablecoin
)

function getPrice(asset) {
  if (asset.assetType === 'futures') return asset.markPrice
  return asset.tokenPrice || asset.price
}

function getVolume(asset) {
  return asset.volume24h || asset.totalVolume || 0
}

function getInitials(name) {
  if (!name) return '??'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getSearchText(asset) {
  const parts = [asset.name, asset.symbol, asset.title, asset.sector, asset.category]
  return parts.filter(Boolean).join(' ').toLowerCase()
}

/* ---------- Curated sections ---------- */

const topGainers = [...tradeable]
  .sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0))
  .slice(0, 3)

const trending = [...tradeable]
  .sort((a, b) => getVolume(b) - getVolume(a))
  .slice(0, 3)

const newlyAdded = [
  ...tokenizedAssets.slice(-2),
  ...predictions.slice(-1),
]

/* ---------- Compact row for curated sections ---------- */

function CuratedRow({ asset }) {
  const navigate = useNavigate()
  const price = getPrice(asset)
  const isPrediction = asset.assetType === 'prediction'

  return (
    <button
      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-surface transition-colors text-left"
      onClick={() => navigate(`/asset/${asset.id}`)}
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-primary">
          {getInitials(asset.name || asset.title)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {isPrediction ? asset.title : asset.name}
        </p>
        <p className="text-xs text-text-muted font-mono">
          {asset.symbol || asset.category}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        {isPrediction ? (
          <p className="text-sm font-mono font-medium text-success">
            YES {(asset.yesPrice * 100).toFixed(0)}c
          </p>
        ) : (
          <>
            <p className="text-sm font-mono font-medium text-text-primary">
              {formatZAR(price)}
            </p>
            <PriceChange change={asset.change24h ?? 0} size="sm" />
          </>
        )}
      </div>
    </button>
  )
}

function CuratedSection({ title, icon: Icon, items, metric }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="divide-y divide-border/50">
        {items.map((asset) => (
          <CuratedRow key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Main component ---------- */

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()

    return allAssets
      .filter((asset) => {
        if (activeTab !== 'all' && asset.assetType !== activeTab) return false
        if (query && !getSearchText(asset).includes(query)) return false
        return true
      })
      .sort((a, b) => getVolume(b) - getVolume(a))
  }, [activeTab, search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Explore</h1>
          <p className="text-text-secondary text-sm mt-1">
            Discover and trade all asset classes
          </p>
        </div>
      </div>

      {/* Curated sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CuratedSection
          title="Top Gainers (24H)"
          icon={TrendingUp}
          items={topGainers}
        />
        <CuratedSection
          title="Trending (24H)"
          icon={Flame}
          items={trending}
        />
        <CuratedSection
          title="Newly Added"
          icon={Sparkles}
          items={newlyAdded}
        />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="w-full sm:w-64">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Results count */}
      <p className="text-sm text-text-muted">
        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        {activeTab !== 'all' && ` in ${activeTab}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Asset grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-muted">No assets found</p>
          <button
            onClick={() => {
              setSearch('')
              setActiveTab('all')
            }}
            className="text-primary text-sm mt-2 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
