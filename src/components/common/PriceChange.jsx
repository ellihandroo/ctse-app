import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatChange } from '../../utils/formatters'

export default function PriceChange({ change, size = 'sm', showIcon = true }) {
  const isPositive = change > 0
  const isNeutral = change === 0

  const colorClass = isNeutral
    ? 'text-text-muted'
    : isPositive
      ? 'text-success'
      : 'text-error'

  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'

  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown

  return (
    <span className={`inline-flex items-center gap-1 font-medium ${colorClass} ${sizeClass}`}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {formatChange(change)}
    </span>
  )
}
