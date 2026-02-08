import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { findAssetById } from '../data/allAssets'
import Button from '../components/common/Button'
import TradeWidget from '../components/asset/TradeWidget'
import EquityDetail from '../components/asset/EquityDetail'
import TokenizedDetail from '../components/asset/TokenizedDetail'
import PredictionDetail from '../components/asset/PredictionDetail'
import FuturesDetail from '../components/asset/FuturesDetail'
import CryptoDetail from '../components/asset/CryptoDetail'

const detailComponents = {
  equity: EquityDetail,
  tokenized: TokenizedDetail,
  prediction: PredictionDetail,
  futures: FuturesDetail,
  crypto: CryptoDetail,
}

export default function AssetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const asset = findAssetById(id)

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

  return (
    <div className="max-w-6xl">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="lg:flex lg:gap-6">
        {/* Left column — asset details */}
        <div className="flex-1 min-w-0">
          <DetailComponent asset={asset} />
        </div>

        {/* Right column — sticky trade widget */}
        <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-6 lg:mt-0">
          <div className="sticky" style={{ top: '6.5rem' }}>
            <TradeWidget asset={asset} />
          </div>
        </div>
      </div>
    </div>
  )
}
