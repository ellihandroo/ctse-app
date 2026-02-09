import { marketIndices } from '../../data/marketIndices'
import { TrendingUp, TrendingDown } from 'lucide-react'

function TickerItem({ item }) {
  const isPositive = item.change24h >= 0

  return (
    <span className="inline-flex items-center gap-1.5 px-4 text-xs whitespace-nowrap">
      <span className="font-medium text-text-secondary">{item.symbol}</span>
      <span className="font-mono text-text-primary">
        {item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className={`inline-flex items-center gap-0.5 font-mono ${isPositive ? 'text-success' : 'text-error'}`}>
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
      </span>
    </span>
  )
}

export default function MarketTicker() {
  return (
    <div className="h-8 bg-white overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)' }}>
      <div className="ticker-track flex items-center h-full">
        {/* Duplicate items for seamless infinite loop */}
        {marketIndices.map((item) => (
          <TickerItem key={item.id} item={item} />
        ))}
        {marketIndices.map((item) => (
          <TickerItem key={`dup-${item.id}`} item={item} />
        ))}
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 30s linear infinite;
          width: max-content;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
