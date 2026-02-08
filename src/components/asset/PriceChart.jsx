import { useState, useCallback } from 'react'
import InteractiveChart from '../common/InteractiveChart'
import { generateChartData } from '../../utils/generateChartData'

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y']

export default function PriceChart({
  sparkline,
  currentPrice,
  assetId,
  change24h = 0,
  onHover,
  height = 300,
}) {
  const [timeframe, setTimeframe] = useState('1M')

  const lineColor = change24h >= 0 ? '#22c55e' : '#ef4444'
  const data = generateChartData(sparkline, timeframe, currentPrice, assetId)

  const handleCrosshairMove = useCallback(
    (info) => {
      if (!onHover) return
      if (!info) {
        onHover(null)
        return
      }
      onHover({ price: info.value, time: info.time })
    },
    [onHover]
  )

  return (
    <div>
      <InteractiveChart
        data={data}
        lineColor={lineColor}
        height={height}
        onCrosshairMove={handleCrosshairMove}
      />

      {/* Timeframe tabs below chart */}
      <div className="flex justify-center gap-1 mt-2">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              timeframe === tf
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  )
}
