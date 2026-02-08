import { useParams } from 'react-router-dom'
import Card from '../components/common/Card'

export default function AssetDetail() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Asset: {id}</h1>
      <Card>
        <p className="text-sm text-text-muted">
          Asset detail page coming in Phase 2...
        </p>
      </Card>
    </div>
  )
}
