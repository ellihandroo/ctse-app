import { formatZAR } from '../../utils/formatters'

export default function TradeHistory({ trades }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Recent Trades
      </h3>
      <div className="grid grid-cols-3 text-xs text-gray-500 mb-1 px-1">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Time</span>
      </div>
      <div className="space-y-0">
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-3 text-xs py-0.5 px-1">
            <span className={`font-mono ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
              {formatZAR(trade.price)}
            </span>
            <span className="text-right text-gray-400 font-mono">{trade.size}</span>
            <span className="text-right text-gray-500">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
