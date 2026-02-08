import { useState } from 'react'

const TRUNCATE_LENGTH = 200

export default function AboutSection({ title = 'About', description, details }) {
  const [expanded, setExpanded] = useState(false)
  const shouldTruncate = description.length > TRUNCATE_LENGTH

  const displayText = shouldTruncate && !expanded
    ? description.slice(0, TRUNCATE_LENGTH) + '...'
    : description

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {displayText}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="ml-1 text-primary font-medium hover:underline"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>

      {details && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {Object.entries(details).map(([key, value]) => (
            <div key={key}>
              <p className="text-xs text-text-muted mb-0.5 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm font-medium text-text-primary">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
