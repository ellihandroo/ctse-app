import { useState } from 'react'
import { Clock } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatZAR } from '../../utils/formatters'

function EquityCryptoTokenizedWidget({ asset }) {
  const [tab, setTab] = useState('buy')
  const [amount, setAmount] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const price = asset.tokenPrice || asset.price
  const shares = amount ? (parseFloat(amount) / price).toFixed(4) : '0'

  const handleSubmit = () => {
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setAmount('')
    }, 2000)
  }

  return (
    <>
      {/* Tab toggle */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
        <button
          onClick={() => setTab('buy')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'buy'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTab('sell')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'sell'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-xs text-text-muted mb-1.5">
          Amount (ZAR)
        </label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Estimated shares */}
      <div className="flex justify-between text-sm mb-4 px-1">
        <span className="text-text-muted">Est. {asset.assetType === 'tokenized' ? 'tokens' : 'shares'}</span>
        <span className="font-mono font-medium text-text-primary">{shares}</span>
      </div>

      {/* Market price */}
      <div className="flex justify-between text-sm mb-6 px-1">
        <span className="text-text-muted">Market price</span>
        <span className="font-mono font-medium text-text-primary">{formatZAR(price)}</span>
      </div>

      {confirmed ? (
        <div className="w-full py-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold text-center">
          Order placed!
        </div>
      ) : (
        <Button
          variant={tab === 'buy' ? 'primary' : 'secondary'}
          size="lg"
          className="w-full"
          onClick={handleSubmit}
        >
          {tab === 'buy' ? 'Buy' : 'Sell'} {asset.symbol}
        </Button>
      )}
    </>
  )
}

function FuturesWidget({ asset }) {
  const [tab, setTab] = useState('long')
  const [amount, setAmount] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = () => {
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setAmount('')
    }, 2000)
  }

  return (
    <>
      {/* Tab toggle */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
        <button
          onClick={() => setTab('long')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'long'
              ? 'bg-success text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Long
        </button>
        <button
          onClick={() => setTab('short')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'short'
              ? 'bg-error text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Short
        </button>
      </div>

      {/* Leverage badge */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="error">{asset.maxLeverage}x</Badge>
        <span className="text-xs text-text-muted">Max leverage</span>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-xs text-text-muted mb-1.5">
          Margin (ZAR)
        </label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Mark price */}
      <div className="flex justify-between text-sm mb-6 px-1">
        <span className="text-text-muted">Mark price</span>
        <span className="font-mono font-medium text-text-primary">{formatZAR(asset.markPrice)}</span>
      </div>

      {confirmed ? (
        <div className="w-full py-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold text-center">
          Order placed!
        </div>
      ) : (
        <Button
          variant={tab === 'long' ? 'success' : 'danger'}
          size="lg"
          className="w-full"
          onClick={handleSubmit}
        >
          {tab === 'long' ? 'Long' : 'Short'} {asset.symbol}
        </Button>
      )}
    </>
  )
}

function PredictionWidget({ asset }) {
  const [side, setSide] = useState('yes')
  const [amount, setAmount] = useState('')

  const price = side === 'yes' ? asset.yesPrice : asset.noPrice
  const priceInCents = (price * 100).toFixed(0)
  const amountNum = parseFloat(amount) || 0
  const estShares = amountNum > 0 ? Math.floor(amountNum / price) : 0
  const potentialPayout = estShares * 1

  return (
    <>
      {/* YES / NO toggle */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
        <button
          onClick={() => setSide('yes')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            side === 'yes'
              ? 'bg-success text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          YES {(asset.yesPrice * 100).toFixed(0)}c
        </button>
        <button
          onClick={() => setSide('no')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            side === 'no'
              ? 'bg-error text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          NO {(asset.noPrice * 100).toFixed(0)}c
        </button>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-xs text-text-muted mb-1.5">
          Amount (ZAR)
        </label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Est. shares */}
      <div className="flex justify-between text-sm mb-4 px-1">
        <span className="text-text-muted">Est. shares</span>
        <span className="font-mono font-medium text-text-primary">
          {estShares.toLocaleString()}
        </span>
      </div>

      {/* Share price */}
      <div className="flex justify-between text-sm mb-4 px-1">
        <span className="text-text-muted">Share price</span>
        <span className="font-mono font-medium text-text-primary">
          {priceInCents}c
        </span>
      </div>

      {/* Potential payout */}
      <div className="flex justify-between text-sm mb-6 px-1">
        <span className="text-text-muted">Potential payout</span>
        <span className="font-mono font-semibold text-text-primary">
          {formatZAR(potentialPayout)}
        </span>
      </div>

      <Button
        variant={side === 'yes' ? 'success' : 'danger'}
        size="lg"
        className="w-full"
      >
        Buy {side === 'yes' ? 'YES' : 'NO'}
      </Button>

      <p className="text-xs text-text-muted mt-3 text-center">
        Pays R1.00 per share if correct
      </p>
    </>
  )
}

const widgetMap = {
  equity: EquityCryptoTokenizedWidget,
  crypto: EquityCryptoTokenizedWidget,
  tokenized: EquityCryptoTokenizedWidget,
  futures: FuturesWidget,
  prediction: PredictionWidget,
}

export default function TradeWidget({ asset, compact, tradingHours }) {
  const WidgetContent = widgetMap[asset.assetType] || EquityCryptoTokenizedWidget

  if (compact) {
    return <WidgetContent asset={asset} />
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">
          {asset.assetType === 'prediction' ? 'Trade' : `Trade ${asset.symbol}`}
        </h3>
        {tradingHours && (
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3 h-3" />
            {tradingHours}
          </span>
        )}
      </div>
      <WidgetContent asset={asset} />
    </Card>
  )
}
