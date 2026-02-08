import { useParams } from 'react-router-dom'
import Card from '../components/common/Card'

export default function Trade() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Trade: {id}</h1>
      <Card>
        <p className="text-sm text-text-muted">
          Trading interface with order book coming in Phase 3...
        </p>
      </Card>
    </div>
  )
}
