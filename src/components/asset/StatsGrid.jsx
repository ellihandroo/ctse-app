import Card from '../common/Card'

export default function StatsGrid({ stats }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-3">Key Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-text-muted mb-0.5">{label}</p>
            <p className="text-sm font-semibold font-mono text-text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
