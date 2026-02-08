export default function AnalystRatings({ ratings }) {
  if (!ratings) return null

  const { buy, hold, sell } = ratings
  const total = buy + hold + sell
  if (total === 0) return null

  const buyPct = Math.round((buy / total) * 100)
  const holdPct = Math.round((hold / total) * 100)
  const sellPct = 100 - buyPct - holdPct

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Analyst Ratings</h3>

      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-3">
        <div className="bg-success" style={{ width: `${buyPct}%` }} />
        <div className="bg-amber-400" style={{ width: `${holdPct}%` }} />
        <div className="bg-error" style={{ width: `${sellPct}%` }} />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="text-text-secondary">
            Buy <span className="font-semibold text-text-primary">{buyPct}%</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-text-secondary">
            Hold <span className="font-semibold text-text-primary">{holdPct}%</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-error" />
          <span className="text-text-secondary">
            Sell <span className="font-semibold text-text-primary">{sellPct}%</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-2">
        Based on {total} analyst{total !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
