export default function Sparkline({
  data = [],
  width = 80,
  height = 32,
  color,
  strokeWidth = 1.5,
}) {
  if (data.length < 2) return null

  const isPositive = data[data.length - 1] >= data[0]
  const lineColor = color || (isPositive ? '#22c55e' : '#ef4444')

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 4) - 2
    return `${x},${y}`
  })

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
