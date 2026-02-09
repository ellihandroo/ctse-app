import {
  Wallet as WalletIcon,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Coins,
} from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import AssetIcon from '../components/common/AssetIcon'
import { formatZAR, formatAPY } from '../utils/formatters'
import { brokerWallet, spendWallet } from '../data/wallet'

export default function Wallet() {
  const brokerTotal = brokerWallet.balances.reduce((sum, b) => sum + b.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Wallet</h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your investment and spending wallets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broker Wallet */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <WalletIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Broker Wallet</h2>
              <p className="text-xs text-text-muted">For investments & earnings</p>
            </div>
          </div>

          <p className="text-2xl font-bold font-mono text-text-primary mb-4">
            {formatZAR(brokerTotal)}
          </p>

          {/* Balances */}
          <div className="space-y-3 mb-4">
            {brokerWallet.balances.map((balance) => (
              <div key={balance.asset} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol={balance.asset} name={balance.asset} size="sm" />
                  <div>
                    <span className="text-sm font-medium text-text-primary">{balance.asset}</span>
                    {balance.apy && (
                      <Badge variant="success" className="ml-2">{formatAPY(balance.apy)}</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium text-text-primary">
                    {formatZAR(balance.value)}
                  </p>
                  <p className="text-xs text-text-muted font-mono">
                    {balance.amount} {balance.asset}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent income */}
          <div className="border-t border-border pt-3 mb-4">
            <h3 className="text-xs font-semibold text-text-secondary mb-2">Recent Income</h3>
            {brokerWallet.recentIncome.map((income) => (
              <div key={income.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5 text-primary" />
                  <div>
                    <span className="text-xs text-text-primary">{income.type}</span>
                    <span className="text-xs text-text-muted"> from {income.source}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-success">+{formatZAR(income.amount)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="primary" size="sm" className="flex-1">
              <ArrowDownLeft className="w-4 h-4" />
              Deposit
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <ArrowUpRight className="w-4 h-4" />
              Withdraw
            </Button>
          </div>
        </Card>

        {/* Spend Wallet */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-warning" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Spend Wallet</h2>
              <p className="text-xs text-text-muted">For daily spending</p>
            </div>
          </div>

          <p className="text-2xl font-bold font-mono text-text-primary mb-1">
            {formatZAR(spendWallet.balance)}
          </p>
          <p className="text-xs text-text-muted mb-4">
            Linked to card {spendWallet.cardNumber}
          </p>

          {/* Transactions */}
          <div className="space-y-2 mb-4">
            {spendWallet.transactions.map((tx) => {
              const isTopUp = tx.amount > 0
              return (
                <div key={tx.id} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isTopUp ? 'bg-green-50' : 'bg-surface'}`}>
                      {isTopUp ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-text-primary">{tx.merchant}</p>
                      <p className="text-xs text-text-muted">{tx.time}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-mono font-medium ${isTopUp ? 'text-success' : 'text-text-primary'}`}>
                    {isTopUp ? '+' : ''}{formatZAR(tx.amount)}
                  </span>
                </div>
              )
            })}
          </div>

          <Button variant="primary" size="sm" className="w-full">
            <TrendingUp className="w-4 h-4" />
            Top Up from Broker Wallet
          </Button>
        </Card>
      </div>
    </div>
  )
}
