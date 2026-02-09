import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { X, Maximize2 } from 'lucide-react'
import { findAssetById } from '../data/allAssets'
import Button from '../components/common/Button'
import TradeWidget from '../components/asset/TradeWidget'
import EquityDetail from '../components/asset/EquityDetail'
import TokenizedDetail from '../components/asset/TokenizedDetail'
import PredictionDetail from '../components/asset/PredictionDetail'
import FuturesDetail from '../components/asset/FuturesDetail'
import CryptoDetail from '../components/asset/CryptoDetail'
import { formatZAR, formatCompact } from '../utils/formatters'
import PriceChange from '../components/common/PriceChange'

const detailComponents = {
  equity: EquityDetail,
  tokenized: TokenizedDetail,
  prediction: PredictionDetail,
  futures: FuturesDetail,
  crypto: CryptoDetail,
}

function getPrice(asset) {
  if (asset.assetType === 'futures') return asset.markPrice
  if (asset.assetType === 'prediction') return null
  return asset.tokenPrice || asset.price
}

function getCtaLabel(asset) {
  if (asset.assetType === 'prediction') return 'Trade'
  if (asset.assetType === 'futures') return 'Long / Short'
  return 'Buy / Sell'
}

function MobileTradeSheet({ isOpen, onClose, asset }) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto safe-area-bottom">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-base font-semibold text-text-primary">
            {asset.assetType === 'prediction' ? 'Trade' : `Trade ${asset.symbol}`}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>
        <div className="px-5 pb-6">
          <TradeWidget asset={asset} compact />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function AssetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const asset = findAssetById(id)
  const [showTrade, setShowTrade] = useState(false)

  if (!asset) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-text-secondary mb-4">Asset not found</p>
        <Button variant="secondary" onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    )
  }

  const DetailComponent = detailComponents[asset.assetType] || EquityDetail
  const price = getPrice(asset)
  const showAdvanced = asset.assetType !== 'prediction'

  const is247 = asset.assetType === 'crypto' && !asset.isStablecoin

  const headerActions = showAdvanced ? (
    <button
      onClick={() => navigate(`/trade/${id}`)}
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-surface transition-colors"
    >
      <Maximize2 className="w-3.5 h-3.5" />
      Advanced
    </button>
  ) : null

  return (
    <div className="max-w-6xl">
      <div className="lg:flex lg:gap-6">
        {/* Left column — asset details */}
        <div className="flex-1 min-w-0 pb-24 lg:pb-0">
          <DetailComponent asset={asset} headerActions={headerActions} />
        </div>

        {/* Right column — sticky trade widget (desktop only) */}
        <div className="hidden lg:block w-[360px] flex-shrink-0">
          <div className="sticky" style={{ top: '5.5rem' }}>
            <TradeWidget asset={asset} tradingHours={is247 ? '24/7' : null} />
          </div>
        </div>
      </div>

      {/* Mobile: fixed bottom CTA bar (portalled to escape animation containment) */}
      {createPortal(
        <div className="fixed bottom-14 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              {price ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold font-mono text-text-primary">
                    R {formatCompact(price)}
                  </span>
                  <PriceChange change={asset.change24h ?? 0} size="sm" />
                </div>
              ) : (
                <span className="text-sm font-semibold text-text-primary">
                  {asset.title || asset.name}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowTrade(true)}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors"
            >
              {getCtaLabel(asset)}
            </button>
          </div>
        </div>,
        document.body
      )}

      <MobileTradeSheet
        isOpen={showTrade}
        onClose={() => setShowTrade(false)}
        asset={asset}
      />
    </div>
  )
}
