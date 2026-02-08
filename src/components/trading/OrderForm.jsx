import { useState } from 'react'
import { formatZAR } from '../../utils/formatters'

export default function OrderForm({ asset, currentPrice }) {
  const [orderType, setOrderType] = useState('limit')
  const [side, setSide] = useState('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(currentPrice?.toString() || '')

  const total = amount && price ? (parseFloat(amount) * parseFloat(price)) : 0
  const isBuy = side === 'buy'

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Place Order
      </h3>

      {/* Order type tabs */}
      <div className="flex gap-1 mb-3">
        {['limit', 'market'].map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-colors ${
              orderType === type
                ? 'bg-dark-border text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Buy/Sell toggle */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setSide('buy')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
            isBuy
              ? 'bg-green-500 text-white'
              : 'bg-dark-border text-gray-400 hover:text-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
            !isBuy
              ? 'bg-red-500 text-white'
              : 'bg-dark-border text-gray-400 hover:text-gray-200'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Price input (limit only) */}
      {orderType === 'limit' && (
        <div className="mb-3">
          <label className="text-xs text-gray-500 mb-1 block">Price (ZAR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-dark-border border border-dark-border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-primary/50"
          />
        </div>
      )}

      {/* Amount input */}
      <div className="mb-3">
        <label className="text-xs text-gray-500 mb-1 block">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-dark-border border border-dark-border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-primary/50"
        />
      </div>

      {/* Quick amount buttons */}
      <div className="flex gap-1 mb-4">
        {['25%', '50%', '75%', '100%'].map((pct) => (
          <button
            key={pct}
            className="flex-1 py-1 text-xs text-gray-500 bg-dark-border rounded hover:text-gray-300 transition-colors"
          >
            {pct}
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between text-sm mb-4 py-2 border-t border-dark-border">
        <span className="text-gray-500">Total</span>
        <span className="text-white font-mono font-medium">
          {total > 0 ? formatZAR(total) : '-'}
        </span>
      </div>

      {/* Submit */}
      <button
        className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
          isBuy
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {isBuy ? 'Buy' : 'Sell'} {asset?.symbol || ''}
      </button>
    </div>
  )
}
