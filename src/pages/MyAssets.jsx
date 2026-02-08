import { useState } from 'react'
import { MapPin, ExternalLink, Shield } from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import { formatZAR } from '../utils/formatters'
import { personalAssets } from '../data/myAssets'

export default function MyAssets() {
  const [collateralAsset, setCollateralAsset] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">My Assets</h1>
        <p className="text-text-secondary text-sm mt-1">
          Your tokenized personal assets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalAssets.map((asset) => (
          <Card key={asset.id} className="flex flex-col">
            {/* Property header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-text-primary">{asset.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="primary">{asset.type}</Badge>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <MapPin className="w-3 h-3" />
                    {asset.location}
                  </span>
                </div>
              </div>
              <Badge variant="neutral">
                <Shield className="w-3 h-3 mr-1" />
                {asset.chain}
              </Badge>
            </div>

            {/* Equity value */}
            <div className="bg-surface rounded-lg p-3 mb-3">
              <p className="text-xs text-text-muted mb-0.5">Equity Tokenized</p>
              <p className="text-xl font-bold font-mono text-text-primary">
                {formatZAR(asset.equity)}
              </p>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                Token: {asset.symbol}
              </p>
            </div>

            {/* Borrowing power */}
            <div className="flex justify-between text-sm mb-4">
              <span className="text-text-muted">LTV Ratio</span>
              <span className="font-medium text-text-primary">{asset.ltv}%</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-text-muted">Borrowing Power</span>
              <span className="font-mono font-medium text-primary">
                {formatZAR(asset.borrowingPower)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => setCollateralAsset(asset)}
              >
                Use as Collateral
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
                View on Chain
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Collateral Modal */}
      <Modal
        isOpen={collateralAsset !== null}
        onClose={() => setCollateralAsset(null)}
        title="Use as Collateral"
      >
        {collateralAsset && (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              Use <span className="font-medium">{collateralAsset.name}</span> as collateral to borrow against your equity.
            </p>
            <div className="bg-surface rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Collateral Value</span>
                <span className="font-mono font-medium">{formatZAR(collateralAsset.equity)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">LTV Ratio</span>
                <span className="font-mono font-medium">{collateralAsset.ltv}%</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Borrowing Power</span>
                <span className="font-mono font-semibold text-primary">
                  {formatZAR(collateralAsset.borrowingPower)}
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              Available to borrow in: eZAR, USDC
            </p>
            <Button variant="primary" className="w-full">
              Enable Collateral
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
