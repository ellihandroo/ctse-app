import Card from '../components/common/Card'

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Marketplace</h1>
        <p className="text-text-secondary text-sm mt-1">
          Discover and trade all asset classes
        </p>
      </div>
      <Card>
        <p className="text-sm text-text-muted">
          Full marketplace with filtering, search, and asset cards coming in Phase 2...
        </p>
      </Card>
    </div>
  )
}
