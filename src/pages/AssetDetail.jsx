import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { findAssetById } from '../data/allAssets'
import Button from '../components/common/Button'
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
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <DetailComponent asset={asset} />
    </div>
  )
}
