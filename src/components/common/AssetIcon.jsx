import { useState } from 'react'

const KNOWN_CRYPTO = new Set([
  'btc', 'eth', 'sol', 'usdc', 'usdt', 'bnb', 'xrp', 'ada', 'doge', 'dot',
  'matic', 'link', 'avax', 'uni', 'atom',
])

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color'
const POLYMARKET_ICON = 'https://polymarket.com/icons/apple-touch-icon.png'

const sizeMap = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-14 h-14 text-lg',
}

const imgSizeMap = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
}

function normalize(symbol) {
  if (!symbol) return ''
  return symbol.replace(/-PERP$/i, '').toLowerCase()
}

const COLOR_PALETTE = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-orange-100', text: 'text-orange-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
]

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function getColor(symbol) {
  return COLOR_PALETTE[hashCode(symbol || '') % COLOR_PALETTE.length]
}

function getInitials(name) {
  if (!name) return '??'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function AssetIcon({ symbol, name, size = 'md', assetType }) {
  const [useFallback, setUseFallback] = useState(false)
  const normalized = normalize(symbol)
  const isPrediction = assetType === 'prediction'
  const hasCryptoIcon = !isPrediction && KNOWN_CRYPTO.has(normalized) && !useFallback

  if (isPrediction && !useFallback) {
    return (
      <img
        src={POLYMARKET_ICON}
        alt="Prediction Market"
        className={`${imgSizeMap[size]} rounded-full flex-shrink-0`}
        onError={() => setUseFallback(true)}
      />
    )
  }

  if (hasCryptoIcon) {
    return (
      <img
        src={`${CDN_BASE}/${normalized}.svg`}
        alt={name || symbol}
        className={`${imgSizeMap[size]} rounded-full flex-shrink-0`}
        onError={() => setUseFallback(true)}
      />
    )
  }

  const color = getColor(symbol)

  return (
    <div className={`${sizeMap[size]} rounded-full ${color.bg} flex items-center justify-center flex-shrink-0`}>
      <span className={`font-semibold ${color.text}`}>
        {getInitials(name || symbol)}
      </span>
    </div>
  )
}
