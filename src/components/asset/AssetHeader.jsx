import Badge from '../common/Badge'
import PriceChange from '../common/PriceChange'
import { formatZAR } from '../../utils/formatters'

const typeConfig = {
  equity: { label: 'Equity', variant: 'neutral' },
  tokenized: { label: 'Tokenized', variant: 'primary' },
  crypto: { label: 'Crypto', variant: 'dark' },
  prediction: { label: 'Prediction', variant: 'warning' },
  futures: { label: 'Futures', variant: 'error' },
}

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function AssetHeader({ asset, price, showChange = true }) {
  const config = typeConfig[asset.assetType] || typeConfig.equity
  const displayName = asset.title || asset.name

  return (
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-bold text-primary">
          {getInitials(displayName)}
        </span>
      </div>
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
        {price != null && (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-text-primary">
              {formatZAR(price)}
            </span>
            {showChange && asset.change24h != null && (
              <PriceChange change={asset.change24h} size="md" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
