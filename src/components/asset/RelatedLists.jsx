export default function RelatedLists({ lists }) {
  if (!lists || lists.length === 0) return null

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Related Lists</h3>
      <div className="flex flex-wrap gap-2">
        {lists.map((item) => (
          <span
            key={item}
            className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
