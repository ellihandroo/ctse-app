import { useState, useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { generateChartData } from '../../utils/generateChartData'

const TIMEFRAMES = ['1W', '1M', '3M', 'ALL']

export default function PredictionChart({
  sparkline,
  yesPrice,
  assetId,
  createdDate,
  height = 240,
}) {
  const [timeframe, setTimeframe] = useState('1M')
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !sparkline || sparkline.length < 2) return

    const yesData = generateChartData(sparkline, timeframe, yesPrice, assetId)
    const noData = yesData.map((point) => ({
      time: point.time,
      value: Math.round((1 - point.value) * 100) / 100,
    }))

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#94a3b8',
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: '#e2e8f0', style: 1 },
      },
      rightPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: { top: 0.08, bottom: 0.08 },
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        timeVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        vertLine: {
          color: '#94a3b8',
          width: 1,
          style: 2,
          labelVisible: true,
        },
        horzLine: {
          color: '#94a3b8',
          width: 1,
          style: 2,
          labelVisible: true,
        },
      },
      handleScroll: false,
      handleScale: false,
      localization: {
        priceFormatter: (price) => `${(price * 100).toFixed(0)}%`,
      },
    })

    const yesSeries = chart.addLineSeries({
      color: '#22c55e',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '#22c55e',
      crosshairMarkerBackgroundColor: '#ffffff',
    })

    const noSeries = chart.addLineSeries({
      color: '#ef4444',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '#ef4444',
      crosshairMarkerBackgroundColor: '#ffffff',
    })

    yesSeries.setData(yesData)
    noSeries.setData(noData)

    chart.timeScale().fitContent()
    chartRef.current = chart

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect
      chart.applyOptions({ width })
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
    }
  }, [sparkline, yesPrice, assetId, timeframe, height, createdDate])

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded bg-success inline-block" />
          <span className="text-xs text-text-muted">Yes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded bg-error inline-block" />
          <span className="text-xs text-text-muted">No</span>
        </div>
      </div>

      {/* Chart */}
      <div ref={containerRef} className="w-full" />

      {/* Timeframe tabs */}
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
