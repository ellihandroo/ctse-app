import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, MapPin, Shield } from 'lucide-react'
import AssetHeader from './AssetHeader'
import PriceChartPlaceholder from './PriceChartPlaceholder'
import StatsGrid from './StatsGrid'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Modal from '../common/Modal'
import { formatZAR, formatAPY, formatCompact, formatNumber } from '../../utils/formatters'

export default function TokenizedDetail({ asset }) {
  const navigate = useNavigate()
  const [showCollateral, setShowCollateral] = useState(false)

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

  const collateralValue = asset.tokenPrice * 100
  const borrowingPower = collateralValue * 0.5

  return (
    <div className="space-y-6">
      <AssetHeader asset={asset} price={asset.tokenPrice} />

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

      <PriceChartPlaceholder data={asset.sparkline} />
      <StatsGrid stats={stats} />

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">About</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {asset.description}
        </p>
      </Card>

      <div className="flex gap-3 flex-wrap">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/trade/${asset.id}`)}
        >
          Buy {asset.symbol}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={() => setShowCollateral(true)}
        >
          Use as Collateral
        </Button>
        <Button variant="ghost" size="lg">
          <ExternalLink className="w-4 h-4" />
          View on Chain
        </Button>
      </div>

      {/* Collateral Modal */}
      <Modal
        isOpen={showCollateral}
        onClose={() => setShowCollateral(false)}
        title="Use as Collateral"
      >
        <div className="space-y-4">
          <div className="bg-surface rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Collateral Value</span>
              <span className="font-mono font-medium">{formatZAR(collateralValue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">LTV Ratio</span>
              <span className="font-mono font-medium">50%</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-sm">
              <span className="text-text-secondary font-medium">Borrowing Power</span>
              <span className="font-mono font-semibold text-primary">{formatZAR(borrowingPower)}</span>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            Available to borrow in: eZAR, USDC
          </p>
          <Button variant="primary" className="w-full">
            Enable Collateral
          </Button>
        </div>
      </Modal>
    </div>
  )
}
