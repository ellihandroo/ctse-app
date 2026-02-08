import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Badge from '../common/Badge'
import PriceChange from '../common/PriceChange'
import { formatZAR, formatAPY } from '../../utils/formatters'

const typeConfig = {
  equity: { label: 'Equity', variant: 'neutral' },
  tokenized: { label: 'Tokenized', variant: 'primary' },
  crypto: { label: 'Crypto', variant: 'dark' },
}

export default function AssetList({ holdings }) {
  const navigate = useNavigate()

  return (
    <Card padding="p-0">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-text-primary">Your Holdings</h3>
      </div>
      <div className="divide-y divide-border">
        {holdings.map((holding) => {
          const config = typeConfig[holding.assetType] || typeConfig.equity
          return (
            <button
              key={holding.id}
              onClick={() => navigate(`/asset/${holding.id}`)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface/50 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {holding.symbol.slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary truncate">
                    {holding.name}
                  </span>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
                <span className="text-xs text-text-muted font-mono">
                  {holding.amount} {holding.symbol}
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium font-mono text-text-primary">
                  {formatZAR(holding.value)}
                </p>
                <div className="flex items-center gap-2 justify-end">
                  <PriceChange change={holding.change24h} showIcon={false} />
                  {holding.apy && (
                    <span className="text-xs text-success font-medium">
                      {formatAPY(holding.apy)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
