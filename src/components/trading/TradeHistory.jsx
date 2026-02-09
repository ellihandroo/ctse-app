import { formatZAR } from '../../utils/formatters'

export default function TradeHistory({ trades }) {
  return (
    <div>
      <div className="grid grid-cols-3 text-xs text-text-muted mb-1 px-1">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Time</span>
      </div>
      <div className="space-y-0">
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-3 text-xs py-0.5 px-1">
            <span className={`font-mono ${trade.side === 'buy' ? 'text-success' : 'text-error'}`}>
              {formatZAR(trade.price)}
            </span>
            <span className="text-right text-text-muted font-mono">{trade.size}</span>
            <span className="text-right text-text-muted">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
