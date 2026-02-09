import Badge from '../common/Badge'
import PriceChange from '../common/PriceChange'
import AssetIcon from '../common/AssetIcon'
import { formatZAR } from '../../utils/formatters'

const typeConfig = {
  equity: { label: 'Equity', variant: 'neutral' },
  tokenized: { label: 'Tokenized', variant: 'primary' },
  crypto: { label: 'Crypto', variant: 'dark' },
  prediction: { label: 'Prediction', variant: 'warning' },
  futures: { label: 'Futures', variant: 'error' },
}

export default function AssetHeader({ asset, price, showChange = true, hoveredPrice, hoveredTime }) {
  const config = typeConfig[asset.assetType] || typeConfig.equity
  const displayName = asset.title || asset.name
  const isHovering = hoveredPrice != null

  const displayPrice = isHovering ? hoveredPrice : price

  const formattedTime = isHovering && hoveredTime
    ? new Date(hoveredTime * 1000).toLocaleString('en-ZA', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <div className="flex items-start gap-4">
      <AssetIcon symbol={asset.symbol} name={displayName} size="xl" assetType={asset.assetType} />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            {displayName}
          </h1>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        {asset.symbol && (
          <p className="text-sm text-text-muted font-mono mt-0.5">
            {asset.symbol}
          </p>
        )}
        {displayPrice != null && (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-text-primary">
              {formatZAR(displayPrice)}
            </span>
            {isHovering && formattedTime ? (
              <span className="text-sm text-text-muted">{formattedTime}</span>
            ) : (
              showChange && asset.change24h != null && (
                <PriceChange change={asset.change24h} size="md" />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
