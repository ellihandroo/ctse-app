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
