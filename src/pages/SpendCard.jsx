import { useState } from 'react'
import { Snowflake, Smartphone, CreditCard } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { formatZAR } from '../utils/formatters'
import { spendWallet } from '../data/wallet'
import { useUser } from '../context/UserContext'

export default function SpendCard() {
  const { user } = useUser()
  const [frozen, setFrozen] = useState(false)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Spend Card</h1>
        <p className="text-text-secondary text-sm mt-1">
          Your virtual debit card for everyday spending
        </p>
      </div>

      {/* Virtual card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-hover p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-semibold">CTSE</span>
            </div>
            <CreditCard className="w-8 h-8 text-white/60" />
          </div>

          <p className="text-xl font-mono tracking-widest mb-6">
            {spendWallet.cardNumber}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/60 mb-0.5">Card Holder</p>
              <p className="font-medium">{user?.name || 'Card Holder'}</p>
            </div>
            <div>
              <p className="text-xs text-white/60 mb-0.5">Expires</p>
              <p className="font-mono">12/28</p>
            </div>
          </div>
        </div>
      </div>

      {/* Balance */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Card Balance</p>
            <p className="text-2xl font-bold font-mono text-text-primary">
              {formatZAR(spendWallet.balance)}
            </p>
          </div>
          {frozen && (
            <span className="flex items-center gap-1 text-sm text-blue-500 font-medium">
              <Snowflake className="w-4 h-4" />
              Frozen
            </span>
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Button variant="primary" size="sm">
          <Smartphone className="w-4 h-4" />
          Add to Apple Wallet
        </Button>
        <Button variant="secondary" size="sm">
          <Smartphone className="w-4 h-4" />
          Add to Google Pay
        </Button>
        <Button
          variant={frozen ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFrozen((prev) => !prev)}
        >
          <Snowflake className="w-4 h-4" />
          {frozen ? 'Unfreeze Card' : 'Freeze Card'}
        </Button>
      </div>

      {/* Recent transactions */}
      <Card padding="p-0">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-sm font-semibold text-text-primary">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-border">
          {spendWallet.transactions.map((tx) => {
            const isTopUp = tx.amount > 0
            return (
              <div key={tx.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm text-text-primary">{tx.merchant}</p>
                  <p className="text-xs text-text-muted">{tx.time}</p>
                </div>
                <span className={`text-sm font-mono font-medium ${isTopUp ? 'text-success' : 'text-text-primary'}`}>
                  {isTopUp ? '+' : ''}{formatZAR(tx.amount)}
                </span>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
