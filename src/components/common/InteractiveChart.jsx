import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export default function InteractiveChart({
  data = [],
  lineColor = '#22c55e',
  height = 300,
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
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: {
        visible: false,
        borderVisible: false,
      },
      crosshair: {
        vertLine: {
          color: '#94a3b8',
          width: 1,
          style: 2, // dashed
          labelVisible: false,
        },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    })

    const areaSeries = chart.addAreaSeries({
      lineColor,
      lineWidth: 2,
      topColor: lineColor + '4D', // 30% opacity
      bottomColor: lineColor + '00', // transparent
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 5,
      crosshairMarkerBorderColor: lineColor,
      crosshairMarkerBackgroundColor: '#ffffff',
      priceLineVisible: false,
      lastValueVisible: false,
    })

    areaSeries.setData(data)

    // Dotted baseline at first value
    const baselineValue = data[0].value
    const baselineSeries = chart.addLineSeries({
      color: '#94a3b8',
      lineWidth: 1,
      lineStyle: 1, // dotted
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    })
    baselineSeries.setData([
      { time: data[0].time, value: baselineValue },
      { time: data[data.length - 1].time, value: baselineValue },
    ])

    chart.timeScale().fitContent()

    if (onCrosshairMove) {
      chart.subscribeCrosshairMove((param) => {
        if (!param.time || !param.seriesData) {
          onCrosshairMove(null)
          return
        }
        const value = param.seriesData.get(areaSeries)?.value
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
  }, [data, lineColor, height, onCrosshairMove])

  return <div ref={containerRef} className="w-full" />
}
