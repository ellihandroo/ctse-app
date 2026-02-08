import { useState } from 'react'

export default function KeyStatistics({ stats, defaultVisible = 4 }) {
  const [showAll, setShowAll] = useState(false)
  const hasMore = stats.length > defaultVisible
  const visibleStats = showAll ? stats : stats.slice(0, defaultVisible)

  return (
    <div className="border-t border-border pt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-primary">Key Statistics</h3>
        {hasMore && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs text-primary font-medium hover:underline"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {visibleStats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-text-muted mb-0.5">{label}</p>
            <p className="text-sm font-semibold font-mono text-text-primary">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
