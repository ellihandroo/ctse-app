import { formatZAR } from '../../utils/formatters'

export default function OrderBook({ bids, asks }) {
  const maxSize = Math.max(
    ...bids.map((b) => b.size),
    ...asks.map((a) => a.size)
  )

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Order Book
      </h3>

      {/* Header */}
      <div className="grid grid-cols-2 text-xs text-gray-500 mb-1 px-1">
        <span>Price (ZAR)</span>
        <span className="text-right">Size</span>
      </div>

      {/* Asks (sells) — top, red */}
      <div className="flex-1 flex flex-col justify-end overflow-hidden">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="relative grid grid-cols-2 text-xs py-0.5 px-1">
            <div
              className="absolute right-0 top-0 bottom-0 bg-red-500/10"
              style={{ width: `${(ask.size / maxSize) * 100}%` }}
            />
            <span className="relative text-red-400 font-mono">{formatZAR(ask.price)}</span>
            <span className="relative text-right text-gray-400 font-mono">{ask.size}</span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="py-1.5 px-1 border-y border-dark-border my-1">
        <span className="text-xs text-gray-500">
          Spread: {bids.length > 0 && asks.length > 0
            ? formatZAR(asks[asks.length - 1].price - bids[0].price)
            : '-'}
        </span>
      </div>

      {/* Bids (buys) — bottom, green */}
      <div className="flex-1 overflow-hidden">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-2 text-xs py-0.5 px-1">
            <div
              className="absolute right-0 top-0 bottom-0 bg-green-500/10"
              style={{ width: `${(bid.size / maxSize) * 100}%` }}
            />
            <span className="relative text-green-400 font-mono">{formatZAR(bid.price)}</span>
            <span className="relative text-right text-gray-400 font-mono">{bid.size}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
