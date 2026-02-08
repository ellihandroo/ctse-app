import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatZAR } from '../../utils/formatters'

function EquityCryptoTokenizedWidget({ asset }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('buy')
  const [amount, setAmount] = useState('')

  const price = asset.tokenPrice || asset.price
  const shares = amount ? (parseFloat(amount) / price).toFixed(4) : '0'

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

      <Button
        variant={tab === 'buy' ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        onClick={() => navigate(`/trade/${asset.id}`)}
      >
        Review {tab === 'buy' ? 'Buy' : 'Sell'} Order
      </Button>
    </>
  )
}

function FuturesWidget({ asset }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('long')
  const [amount, setAmount] = useState('')

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

      <Button
        variant={tab === 'long' ? 'success' : 'danger'}
        size="lg"
        className="w-full"
        onClick={() => navigate(`/trade/${asset.id}`)}
      >
        {tab === 'long' ? 'Long' : 'Short'} {asset.symbol}
      </Button>
    </>
  )
}

function PredictionWidget({ asset }) {
  const yesPercent = (asset.yesPrice * 100).toFixed(0)
  const noPercent = (asset.noPrice * 100).toFixed(0)

  return (
    <>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        Buy shares based on your prediction
      </p>

      <div className="space-y-3">
        <Button variant="success" size="lg" className="w-full justify-between">
          <span>Buy YES</span>
          <span className="font-mono">{yesPercent}c</span>
        </Button>
        <Button variant="danger" size="lg" className="w-full justify-between">
          <span>Buy NO</span>
          <span className="font-mono">{noPercent}c</span>
        </Button>
      </div>

      <p className="text-xs text-text-muted mt-4 text-center">
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

export default function TradeWidget({ asset }) {
  const WidgetContent = widgetMap[asset.assetType] || EquityCryptoTokenizedWidget

  return (
    <Card className="w-full">
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        {asset.assetType === 'prediction' ? 'Trade' : `Trade ${asset.symbol}`}
      </h3>
      <WidgetContent asset={asset} />
    </Card>
  )
}
