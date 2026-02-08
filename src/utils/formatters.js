export const formatZAR = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatChange = (change) => {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

export const formatCompact = (num) => {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num)
}

export const formatAPY = (apy) => {
  return `${apy.toFixed(1)}% APY`
}

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-ZA').format(num)
}

export const formatRelativeTime = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })
}
