import { TrendingUp, Shield, Info } from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import { formatZAR, formatAPY, formatCompact } from '../utils/formatters'
import { earnOptions, userEarnings } from '../data/earn'

export default function Earn() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Earn</h1>
        <p className="text-text-secondary text-sm mt-1">
          Earn yield on your stablecoins
        </p>
      </div>

      {/* Your Earnings summary */}
      <Card className="bg-primary-light border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-primary font-medium mb-1">Your Earnings</p>
            <p className="text-2xl font-bold font-mono text-text-primary">
              {formatZAR(userEarnings.totalDeposited)}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">Total deposited</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-success">
              +{formatZAR(userEarnings.accruedYield)}
            </p>
            <p className="text-xs text-text-muted">Accrued yield</p>
            <p className="text-xs text-text-secondary mt-2">
              Projected annual: <span className="font-mono font-medium">{formatZAR(userEarnings.projectedAnnual)}</span>
            </p>
          </div>
        </div>

        {/* Active deposits */}
        <div className="mt-4 pt-3 border-t border-primary/10 space-y-2">
          {userEarnings.deposits.map((deposit) => (
            <div key={deposit.asset} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-medium">{deposit.asset}</span>
                <Badge variant="success">{formatAPY(deposit.apy)}</Badge>
              </div>
              <div className="text-right">
                <span className="font-mono text-text-primary">{formatZAR(deposit.amount)}</span>
                <span className="text-xs text-success ml-2">+{formatZAR(deposit.earned)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Earn options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {earnOptions.map((option) => (
          <Card key={option.id} className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {option.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{option.name}</h3>
                <span className="text-xs text-text-muted font-mono">{option.symbol}</span>
              </div>
            </div>

            {/* APY highlight */}
            <div className="bg-green-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-3xl font-bold text-success">
                {option.apy.toFixed(1)}%
              </p>
              <p className="text-xs text-text-secondary mt-0.5">Annual Percentage Yield</p>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Backing</span>
                <span className="text-text-primary flex items-center gap-1">
                  <Shield className="w-3 h-3 text-primary" />
                  {option.backing}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">TVL</span>
                <span className="font-mono text-text-primary">{formatCompact(option.tvl)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Min. deposit</span>
                <span className="font-mono text-text-primary">
                  {option.currency === 'ZAR' ? formatZAR(option.minDeposit) : `$${option.minDeposit}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-text-muted mb-3">{option.description}</p>

            <Button variant="primary" className="w-full">
              <TrendingUp className="w-4 h-4" />
              Deposit {option.symbol}
            </Button>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-text-muted">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Yields are variable and depend on market conditions. Past performance does not guarantee future returns.
          All yield products are regulated by the FSCA.
        </p>
      </div>
    </div>
  )
}
