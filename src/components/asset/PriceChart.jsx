import { useState, useCallback, useMemo } from 'react'
import InteractiveChart from '../common/InteractiveChart'
import { generateChartData } from '../../utils/generateChartData'
import { formatZAR } from '../../utils/formatters'

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y']

const TIMEFRAME_LABELS = {
  '1D': 'today',
  '1W': 'past week',
  '1M': 'past month',
  '3M': 'past 3 months',
  '1Y': 'past year',
}

export default function PriceChart({
  sparkline,
  currentPrice,
  assetId,
  change24h = 0,
  onHover,
  height = 300,
}) {
  const [timeframe, setTimeframe] = useState('1M')

  const data = generateChartData(sparkline, timeframe, currentPrice, assetId)

  const periodChange = useMemo(() => {
    if (data.length < 2) return null
    const startPrice = data[0].value
    const endPrice = data[data.length - 1].value
    const diff = endPrice - startPrice
    const pct = (diff / startPrice) * 100
    return { diff, pct }
  }, [data])

  const lineColor = periodChange && periodChange.diff >= 0 ? '#22c55e' : '#ef4444'

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
      {periodChange && (
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-sm font-semibold font-mono ${periodChange.diff >= 0 ? 'text-success' : 'text-error'}`}>
            {periodChange.diff >= 0 ? '+' : ''}{formatZAR(periodChange.diff)}
            {' '}({periodChange.diff >= 0 ? '+' : ''}{periodChange.pct.toFixed(2)}%)
          </span>
          <span className="text-xs text-text-muted">{TIMEFRAME_LABELS[timeframe]}</span>
        </div>
      )}

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
