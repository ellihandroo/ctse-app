import { formatZAR } from '../../utils/formatters'

export default function OrderBook({ bids, asks }) {
  const maxSize = Math.max(
    ...bids.map((b) => b.size),
    ...asks.map((a) => a.size)
  )

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-2 text-xs text-text-muted mb-1 px-1">
        <span>Price (ZAR)</span>
        <span className="text-right">Size</span>
      </div>

      {/* Asks (sells) — top, red */}
      <div className="flex flex-col justify-end overflow-hidden">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="relative grid grid-cols-2 text-xs py-0.5 px-1">
            <div
              className="absolute right-0 top-0 bottom-0 bg-error/10"
              style={{ width: `${(ask.size / maxSize) * 100}%` }}
            />
            <span className="relative text-error font-mono">{formatZAR(ask.price)}</span>
            <span className="relative text-right text-text-muted font-mono">{ask.size}</span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="py-1.5 px-1 border-y border-border my-1">
        <span className="text-xs text-text-muted">
          Spread: {bids.length > 0 && asks.length > 0
            ? formatZAR(asks[asks.length - 1].price - bids[0].price)
            : '-'}
        </span>
      </div>

      {/* Bids (buys) — bottom, green */}
      <div className="overflow-hidden">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-2 text-xs py-0.5 px-1">
            <div
              className="absolute right-0 top-0 bottom-0 bg-success/10"
              style={{ width: `${(bid.size / maxSize) * 100}%` }}
            />
            <span className="relative text-success font-mono">{formatZAR(bid.price)}</span>
            <span className="relative text-right text-text-muted font-mono">{bid.size}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
