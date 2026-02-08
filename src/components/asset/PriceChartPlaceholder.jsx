import { useState } from 'react'
import Card from '../common/Card'
import Sparkline from '../common/Sparkline'

const timeframes = ['1D', '1W', '1M', '3M', '1Y']

export default function PriceChartPlaceholder({ data = [], height = 200 }) {
  const [active, setActive] = useState('1M')

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Price Chart</h3>
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActive(tf)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                active === tf
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-surface rounded-lg"
        style={{ height }}
      >
        {data.length > 1 ? (
          <Sparkline data={data} width={500} height={height - 40} strokeWidth={2} />
        ) : (
          <p className="text-sm text-text-muted">
            Interactive chart coming soon
          </p>
        )}
      </div>
    </Card>
  )
}
