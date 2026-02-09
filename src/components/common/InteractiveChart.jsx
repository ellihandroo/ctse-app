import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export default function InteractiveChart({
  data = [],
  lineColor = '#22c55e',
  height = 300,
  chartType = 'area',
  pro = false,
  onCrosshairMove,
}) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || data.length < 2) return

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#94a3b8',
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: true, color: '#f1f5f9' },
      },
      rightPriceScale: {
        visible: true,
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
      },
      crosshair: {
        vertLine: {
          color: '#94a3b8',
          width: 1,
          style: 2,
          labelVisible: true,
        },
        horzLine: {
          visible: true,
          color: '#94a3b8',
          width: 1,
          style: 2,
          labelVisible: true,
        },
      },
      handleScroll: pro,
      handleScale: pro,
    })

    let primarySeries

    if (chartType === 'candlestick') {
      primarySeries = chart.addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderUpColor: '#22c55e',
        borderDownColor: '#ef4444',
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
        priceLineVisible: false,
        lastValueVisible: false,
      })
      primarySeries.setData(data)
    } else {
      primarySeries = chart.addAreaSeries({
        lineColor,
        lineWidth: 2,
        topColor: lineColor + '4D',
        bottomColor: lineColor + '00',
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 5,
        crosshairMarkerBorderColor: lineColor,
        crosshairMarkerBackgroundColor: '#ffffff',
        priceLineVisible: false,
        lastValueVisible: false,
      })
      primarySeries.setData(data)

      // Dotted baseline at first value
      const baselineValue = data[0].value
      const baselineSeries = chart.addLineSeries({
        color: '#94a3b8',
        lineWidth: 1,
        lineStyle: 1,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: false,
      })
      baselineSeries.setData([
        { time: data[0].time, value: baselineValue },
        { time: data[data.length - 1].time, value: baselineValue },
      ])
    }

    chart.timeScale().fitContent()

    if (onCrosshairMove) {
      chart.subscribeCrosshairMove((param) => {
        if (!param.time || !param.seriesData) {
          onCrosshairMove(null)
          return
        }
        const seriesData = param.seriesData.get(primarySeries)
        const value = seriesData?.value ?? seriesData?.close
        if (value != null) {
          onCrosshairMove({ time: param.time, value })
        }
      })
    }

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
  }, [data, lineColor, height, chartType, pro, onCrosshairMove])

  return <div ref={containerRef} className="w-full" />
}
