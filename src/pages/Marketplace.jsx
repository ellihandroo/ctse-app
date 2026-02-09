import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Flame, Sparkles, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
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
              R {formatCompact(price)}
            </p>
            <PriceChange change={asset.change24h ?? 0} size="sm" />
          </>
        )}
      </div>
    </button>
  )
}

function CuratedSection({ title, icon: Icon, items }) {
  return (
    <div className="bg-white border border-border rounded-xl p-3 min-w-[220px] flex-shrink-0 md:min-w-0 md:flex-shrink">
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

/* ---------- Sector / category tags ---------- */

const sectorTags = [
  'All',
  'Agriculture',
  'Healthcare',
  'Real Estate',
  'Infrastructure',
  'Investment Holdings',
  'Bonds',
  'Energy',
  'DeFi',
  'Stablecoin',
]

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'gainers', label: 'Top Gainers' },
  { id: 'losers', label: 'Top Losers' },
  { id: 'newest', label: 'Newest' },
]

function getSectorMatch(asset, tag) {
  if (tag === 'All') return true
  const fields = [asset.sector, asset.category, asset.type]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return fields.includes(tag.toLowerCase())
}

function sortAssets(assets, sortId) {
  const sorted = [...assets]
  switch (sortId) {
    case 'gainers':
      return sorted.sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0))
    case 'losers':
      return sorted.sort((a, b) => (a.change24h ?? 0) - (b.change24h ?? 0))
    case 'newest':
      return sorted.reverse()
    default:
      return sorted.sort((a, b) => getVolume(b) - getVolume(a))
  }
}

const assetTypeTabs = [
  { id: 'all', label: 'All Assets' },
  { id: 'equity', label: 'Equities' },
  { id: 'tokenized', label: 'Tokenized' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'prediction', label: 'Predictions' },
  { id: 'futures', label: 'Futures' },
]

/* ---------- Mobile filter bottom sheet ---------- */

function MobileFilterSheet({ isOpen, onClose, filters, onApply }) {
  const [tab, setTab] = useState(filters.activeTab)
  const [sector, setSector] = useState(filters.activeSector)
  const [sortBy, setSortBy] = useState(filters.sort)

  if (!isOpen) return null

  const handleApply = () => {
    onApply({ activeTab: tab, activeSector: sector, sort: sortBy })
    onClose()
  }

  const handleCancel = () => {
    setTab(filters.activeTab)
    setSector(filters.activeSector)
    setSortBy(filters.sort)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden flex items-end justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleCancel} />
      <div className="relative w-full bg-white rounded-2xl max-h-[75vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-semibold text-text-primary">Filters</h3>
          <button onClick={handleCancel} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <div className="px-5 pb-4 space-y-5">
          {/* Asset Type */}
          <div>
            <p className="text-xs font-medium text-text-muted mb-2">Asset Type</p>
            <div className="flex flex-wrap gap-2">
              {assetTypeTabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    tab === id
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-secondary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sector */}
          <div>
            <p className="text-xs font-medium text-text-muted mb-2">Sector</p>
            <div className="flex flex-wrap gap-2">
              {sectorTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSector(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    sector === tag
                      ? 'bg-text-primary text-white'
                      : 'bg-surface text-text-secondary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-xs font-medium text-text-muted mb-2">Sort</p>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === option.id
                      ? 'bg-text-primary text-white'
                      : 'bg-surface text-text-secondary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ---------- Main component ---------- */

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeSector, setActiveSector] = useState('All')
  const [sort, setSort] = useState('popular')
  const [showSector, setShowSector] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()

    const results = allAssets.filter((asset) => {
      if (activeTab !== 'all' && asset.assetType !== activeTab) return false
      if (activeSector !== 'All' && !getSectorMatch(asset, activeSector)) return false
      if (query && !getSearchText(asset).includes(query)) return false
      return true
    })

    return sortAssets(results, sort)
  }, [activeTab, activeSector, sort, search])

  return (
    <div className="space-y-6">
      {/* Curated sections — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none md:grid md:grid-cols-3 md:overflow-visible">
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

      {/* Mobile: Search + Filter icon */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <button
          onClick={() => setShowMobileFilters(true)}
          className={`p-2.5 rounded-lg border transition-colors flex-shrink-0 ${
            activeTab !== 'all' || activeSector !== 'All' || sort !== 'popular'
              ? 'border-primary bg-primary-light text-primary'
              : 'border-border text-text-secondary hover:bg-surface'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <MobileFilterSheet
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={{ activeTab, activeSector, sort }}
        onApply={({ activeTab: t, activeSector: s, sort: so }) => {
          setActiveTab(t)
          setActiveSector(s)
          setSort(so)
        }}
      />

      {/* Desktop: Search + scrollable (Tabs + Sector + Sort) */}
      <div className="hidden md:flex items-center gap-2">
        <div className="w-48 flex-shrink-0">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex-1 flex gap-2 items-center overflow-x-auto scrollbar-none min-w-0">
          <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="relative flex-shrink-0">
            <button
              onClick={() => { setShowSector((prev) => !prev); setShowSort(false) }}
              className={`flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap ${
                activeSector !== 'All'
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-border text-text-secondary hover:bg-surface'
              }`}
            >
              {activeSector === 'All' ? 'Sector' : activeSector}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSector ? 'rotate-180' : ''}`} />
            </button>
            {showSector && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg py-1 z-20 min-w-[160px]">
                {sectorTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveSector(tag)
                      setShowSector(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      activeSector === tag
                        ? 'text-primary font-medium bg-primary-light'
                        : 'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => { setShowSort((prev) => !prev); setShowSector(false) }}
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-surface transition-colors whitespace-nowrap"
            >
              {sortOptions.find((o) => o.id === sort)?.label}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg py-1 z-20 min-w-[140px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSort(option.id)
                      setShowSort(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      sort === option.id
                        ? 'text-primary font-medium bg-primary-light'
                        : 'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
              setActiveSector('All')
              setSort('popular')
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
