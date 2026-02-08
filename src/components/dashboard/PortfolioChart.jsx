import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../common/Card'
import { formatZAR } from '../../utils/formatters'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value, percentage } = payload[0].payload
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-text-primary">{name}</p>
      <p className="text-text-secondary">{formatZAR(value)} ({percentage}%)</p>
    </div>
  )
}

export default function PortfolioChart({ data }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Portfolio Breakdown
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 flex-1">
          {data.map(({ name, percentage, color }) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-text-secondary">{name}</span>
              </div>
              <span className="text-sm font-medium font-mono text-text-primary">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
