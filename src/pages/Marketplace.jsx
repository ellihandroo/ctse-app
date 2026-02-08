import { useState, useMemo } from 'react'
import { TrendingUp, Shield } from 'lucide-react'
import FilterTabs from '../components/marketplace/FilterTabs'
import SearchBar from '../components/marketplace/SearchBar'
import AssetCard from '../components/marketplace/AssetCard'
import Badge from '../components/common/Badge'
import { equities } from '../data/equities'
import { tokenizedAssets } from '../data/tokenizedAssets'
import { crypto } from '../data/crypto'
import { predictions } from '../data/predictions'
import { perpetuals } from '../data/perpetuals'

const allAssets = [
  ...equities,
  ...tokenizedAssets,
  ...crypto,
  ...predictions,
  ...perpetuals,
]

function getSearchText(asset) {
  const parts = [
    asset.name,
    asset.symbol,
    asset.title,
    asset.sector,
    asset.category,
  ]
  return parts.filter(Boolean).join(' ').toLowerCase()
}

function getSortVolume(asset) {
  return asset.volume24h || asset.totalVolume || 0
}

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
      .sort((a, b) => getSortVolume(b) - getSortVolume(a))
  }, [activeTab, search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Marketplace</h1>
          <p className="text-text-secondary text-sm mt-1">
            Discover and trade all asset classes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">
            <Shield className="w-3 h-3 mr-1" />
            FSCA Regulated
          </Badge>
          <Badge variant="neutral">
            <TrendingUp className="w-3 h-3 mr-1" />
            {allAssets.length} Assets
          </Badge>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3">
        <SearchBar value={search} onChange={setSearch} />
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
