import { formatRelativeTime } from '../../utils/formatters'

const PLACEHOLDER_COLORS = [
  'bg-blue-100',
  'bg-emerald-100',
  'bg-amber-100',
  'bg-purple-100',
  'bg-rose-100',
]

export default function NewsSection({ news }) {
  if (!news || news.length === 0) return null

  const items = news.slice(0, 3)

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold text-text-primary mb-4">News</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-text-primary">
                  {item.source}
                </span>
                <span className="text-xs text-text-muted">
                  {formatRelativeTime(item.date)}
                </span>
              </div>
              <p className="text-sm font-semibold text-text-primary leading-snug mb-1">
                {item.headline}
              </p>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {item.snippet}
              </p>
            </div>
            <div
              className={`w-16 h-16 rounded-lg flex-shrink-0 ${PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
