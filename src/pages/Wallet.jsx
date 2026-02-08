import Card from '../components/common/Card'

export default function Wallet() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Wallet</h1>
      <Card>
        <p className="text-sm text-text-muted">
          Dual wallet (Broker + Spend) coming in Phase 3...
        </p>
      </Card>
    </div>
  )
}
