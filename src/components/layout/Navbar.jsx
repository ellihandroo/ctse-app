import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Wallet, ChevronDown, ArrowDownLeft, ArrowUpRight, TrendingUp, Coins, ShieldCheck, CreditCard, CheckCircle } from 'lucide-react'
import { brokerWallet, spendWallet } from '../../data/wallet'
import { formatZAR } from '../../utils/formatters'

const NOTIFICATIONS = [
  { id: 1, icon: TrendingUp, color: 'text-success', bg: 'bg-green-50', title: 'Naspers +4.2%', body: 'Your holding is up R 3,240 today', time: '2m ago', unread: true },
  { id: 2, icon: Coins, color: 'text-primary', bg: 'bg-primary-light', title: 'Dividend received', body: 'BKB Ltd paid R 2,875 to your broker wallet', time: '1h ago', unread: true },
  { id: 3, icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary-light', title: 'eZAR yield credited', body: '+R 534.00 from 8.5% APY staking', time: '3h ago', unread: true },
  { id: 4, icon: CreditCard, color: 'text-warning', bg: 'bg-amber-50', title: 'Card transaction', body: 'Woolworths Food — R 342.00', time: '5h ago', unread: false },
  { id: 5, icon: CheckCircle, color: 'text-success', bg: 'bg-green-50', title: 'Buy order filled', body: '45.2 SOL @ $242.18', time: 'Yesterday', unread: false },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [showWallet, setShowWallet] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const walletRef = useRef(null)
  const notifsRef = useRef(null)

  const brokerTotal = brokerWallet.balances.reduce((sum, b) => sum + b.value, 0)
  const totalBalance = brokerTotal + spendWallet.balance
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (walletRef.current && !walletRef.current.contains(e.target)) {
        setShowWallet(false)
      }
      if (notifsRef.current && !notifsRef.current.contains(e.target)) {
        setShowNotifs(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="h-16 bg-white border-b border-border px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/ctse-wordmark.svg"
          alt="CTSE"
          className="h-6 sm:h-7 cursor-pointer"
          onClick={() => navigate('/marketplace')}
        />
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search assets, markets..."
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right: Notifications + Wallet */}
      <div className="flex items-center gap-3">
        {/* Notifications dropdown */}
        <div className="relative" ref={notifsRef}>
          <button
            className="relative p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => { setShowNotifs((prev) => !prev); setShowWallet(false) }}
          >
            <Bell className="w-5 h-5 text-text-secondary" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-80 bg-white border border-border rounded-xl shadow-lg z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-text-primary">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-xs text-primary font-medium">{unreadCount} new</span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((n) => {
                  const Icon = n.icon
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 hover:bg-surface transition-colors cursor-pointer ${n.unread ? 'bg-primary-light/30' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${n.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary">{n.title}</p>
                        <p className="text-xs text-text-muted truncate">{n.body}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{n.time}</p>
                      </div>
                      {n.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-border">
                <button className="w-full py-2.5 text-xs font-medium text-primary hover:bg-primary-light transition-colors rounded-b-xl">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wallet dropdown */}
        <div className="relative" ref={walletRef}>
          <button
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border border-primary bg-primary-light text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
            onClick={() => { setShowWallet((prev) => !prev); setShowNotifs(false) }}
          >
            <Wallet className="w-4 h-4" />
            <span className="font-mono hidden sm:inline">{formatZAR(totalBalance)}</span>
            <ChevronDown className={`w-3.5 h-3.5 hidden sm:block transition-transform ${showWallet ? 'rotate-180' : ''}`} />
          </button>

          {showWallet && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-72 bg-white border border-border rounded-xl shadow-lg z-50">
              {/* Broker wallet */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Broker Wallet</span>
                  <span className="text-xs text-primary font-medium font-mono">{formatZAR(brokerTotal)}</span>
                </div>
                <div className="space-y-2">
                  {brokerWallet.balances.map((b) => (
                    <div key={b.asset} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-text-secondary">
                            {b.asset.slice(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm text-text-primary">{b.asset}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-text-primary">{formatZAR(b.value)}</p>
                        <p className="text-[10px] font-mono text-text-muted">{b.amount} {b.asset}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spend wallet */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Spend Wallet</span>
                  <span className="text-xs text-primary font-medium font-mono">{formatZAR(spendWallet.balance)}</span>
                </div>
                <p className="text-[10px] text-text-muted">Card {spendWallet.cardNumber}</p>
              </div>

              {/* Actions */}
              <div className="p-3 flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors"
                  onClick={() => { setShowWallet(false); navigate('/wallet') }}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  Deposit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-text-secondary text-xs font-medium hover:bg-surface transition-colors"
                  onClick={() => { setShowWallet(false); navigate('/wallet') }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Withdraw
                </button>
              </div>

              {/* View full wallet link */}
              <div className="border-t border-border">
                <button
                  className="w-full py-2.5 text-xs font-medium text-primary hover:bg-primary-light transition-colors rounded-b-xl"
                  onClick={() => { setShowWallet(false); navigate('/wallet') }}
                >
                  View Full Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
