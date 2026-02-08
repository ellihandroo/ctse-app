import { useUser } from '../context/UserContext'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'

const typeLabels = {
  retail: 'Retail',
  hnw: 'High Net Worth',
  institutional: 'Institutional',
}

export default function Settings() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary">
              {user?.initials}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{user?.name}</h2>
            <p className="text-sm text-text-muted">{user?.email}</p>
            <Badge variant="primary" className="mt-1">
              {typeLabels[user?.type] || user?.type}
            </Badge>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-text-primary mb-3">Preferences</h3>
        <p className="text-sm text-text-muted">
          Full settings coming in Phase 4...
        </p>
      </Card>
    </div>
  )
}
