const TIMEFRAME_POINTS = {
  '1D': 78,
  '1W': 35,
  '1M': 30,
  '3M': 90,
  '1Y': 252,
  'ALL': 120,
}

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hashString(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/**
 * Generates chart-ready { time, value }[] from a sparkline seed array.
 * Interpolates between seed points and adds small noise for realism.
 * The last value always matches currentPrice.
 */
export function generateChartData(sparkline, timeframe, currentPrice, assetId) {
  const totalPoints = TIMEFRAME_POINTS[timeframe] || 30
  const rand = seededRandom(hashString(assetId + timeframe))

  if (!sparkline || sparkline.length < 2) {
    return Array.from({ length: totalPoints }, (_, i) => ({
      time: i,
      value: currentPrice,
    }))
  }

  const values = []
  const segmentLength = (totalPoints - 1) / (sparkline.length - 1)

  for (let i = 0; i < totalPoints; i++) {
    const segIndex = i / segmentLength
    const lower = Math.floor(segIndex)
    const upper = Math.min(lower + 1, sparkline.length - 1)
    const t = segIndex - lower

    const base = sparkline[lower] + (sparkline[upper] - sparkline[lower]) * t
    const noiseScale = base * 0.005
    const noise = (rand() - 0.5) * 2 * noiseScale
    values.push(base + noise)
  }

  // Ensure last value matches currentPrice exactly
  const lastVal = values[values.length - 1]
  const adjustment = currentPrice - lastVal
  const len = values.length
  const adjusted = values.map((v, i) => {
    const weight = i / (len - 1)
    return v + adjustment * weight
  })

  const now = new Date()
  return adjusted.map((value, i) => {
    const date = new Date(now)
    date.setMinutes(date.getMinutes() - (totalPoints - 1 - i) * getInterval(timeframe))
    return {
      time: Math.floor(date.getTime() / 1000),
      value: Math.round(value * 100) / 100,
    }
  })
}

function getInterval(timeframe) {
  switch (timeframe) {
    case '1D': return 5        // 5 min
    case '1W': return 180      // 3 hours
    case '1M': return 1440     // 1 day
    case '3M': return 1440     // 1 day
    case '1Y': return 1440     // 1 day
    case 'ALL': return 2880    // 2 days
    default: return 1440
  }
}
