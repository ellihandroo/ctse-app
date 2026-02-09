import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { findAssetById } from '../data/allAssets'
import { generateOrderBook, tradeHistory } from '../data/orderbook'
import { generateChartData, generateOHLCData } from '../utils/generateChartData'
import { formatZAR, formatCompact } from '../utils/formatters'
import InteractiveChart from '../components/common/InteractiveChart'
import PriceChange from '../components/common/PriceChange'
import OrderBook from '../components/trading/OrderBook'
import OrderForm from '../components/trading/OrderForm'
import TradeHistory from '../components/trading/TradeHistory'
import Button from '../components/common/Button'

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y']
const CHART_TYPES = [
  { key: 'area', label: 'Line' },
  { key: 'candlestick', label: 'Candle' },
]

function getPrice(asset) {
  if (!asset) return 0
  return asset.markPrice || asset.tokenPrice || asset.price || 0
}

function MobileOrderSheet({ isOpen, onClose, asset, currentPrice }) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto safe-area-bottom">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-base font-semibold text-text-primary">
            Trade {asset.symbol}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>
        <div className="px-5 pb-6">
          <OrderForm asset={asset} currentPrice={currentPrice} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Trade() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [timeframe, setTimeframe] = useState('1D')
  const [chartType, setChartType] = useState('area')
  const [showOrderSheet, setShowOrderSheet] = useState(false)

  const asset = findAssetById(id)
  const price = getPrice(asset)

  const orderBook = useMemo(() => generateOrderBook(price), [price])

  const lineData = useMemo(
    () => asset ? generateChartData(asset.sparkline, timeframe, price, id) : [],
    [asset, timeframe, price, id]
  )

  const candleData = useMemo(
    () => asset ? generateOHLCData(asset.sparkline, timeframe, price, id) : [],
    [asset, timeframe, price, id]
  )

  const chartData = chartType === 'candlestick' ? candleData : lineData
  const lineColor = (asset?.change24h ?? 0) >= 0 ? '#22c55e' : '#ef4444'

  if (!asset) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-text-secondary mb-4">Asset not found</p>
        <Button variant="secondary" onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    )
  }

  return (
    <div className="-m-4 md:-m-6">
      {/* Compact header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/asset/${id}`)}
            className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {(asset.symbol || '??').slice(0, 2)}
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm">
              {asset.symbol}
            </span>
            <span className="text-sm text-text-muted hidden sm:inline">
              {asset.name || asset.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-mono text-text-primary">
            {formatZAR(price)}
          </span>
          {asset.change24h != null && (
            <PriceChange change={asset.change24h} size="sm" />
          )}
        </div>
      </div>

      {/* Desktop: 3-column pro layout */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr_300px] h-[calc(100vh-8rem)]">
        {/* Left: Order Book + Recent Trades */}
        <div className="border-r border-border overflow-y-auto p-3">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Order Book
          </h3>
          <OrderBook bids={orderBook.bids} asks={orderBook.asks} />

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Recent Trades
            </h3>
            <TradeHistory trades={tradeHistory} />
          </div>
        </div>

        {/* Center: Chart */}
        <div className="flex flex-col overflow-hidden">
          {/* Chart type + timeframe bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
            {/* Chart type toggle */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {CHART_TYPES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setChartType(key)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    chartType === key
                      ? 'bg-white text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="w-px h-4 bg-border" />

            {/* Timeframe tabs */}
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tf}
              </button>
            ))}

            <div className="flex-1" />

            {/* Compact stats */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-text-muted">
                Vol <span className="font-mono text-text-secondary">{asset.volume24h ? formatCompact(asset.volume24h) : asset.volume ? formatCompact(asset.volume) : '-'}</span>
              </span>
              <span className="text-text-muted">
                MCap <span className="font-mono text-text-secondary">{asset.marketCap ? formatCompact(asset.marketCap) : '-'}</span>
              </span>
            </div>
          </div>

          {/* Chart area */}
          <div className="flex-1 p-4">
            <InteractiveChart
              data={chartData}
              lineColor={lineColor}
              height={480}
              chartType={chartType}
              pro
            />
          </div>
        </div>

        {/* Right: Order Form */}
        <div className="border-l border-border overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Place Order</h3>
          <OrderForm asset={asset} currentPrice={price} />
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="lg:hidden">
        {/* Chart type + timeframe */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {CHART_TYPES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setChartType(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  chartType === key
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-border" />
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                timeframe === tf
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="px-4 pb-2">
          <InteractiveChart
            data={chartData}
            lineColor={lineColor}
            height={280}
            chartType={chartType}
            pro
          />
        </div>

        {/* Order Book + Trades */}
        <div className="px-4 pb-24">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Order Book
          </h3>
          <div className="border border-border rounded-lg p-3 mb-4">
            <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
          </div>

          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Recent Trades
          </h3>
          <div className="border border-border rounded-lg p-3">
            <TradeHistory trades={tradeHistory} />
          </div>
        </div>
      </div>

      {/* Mobile: fixed bottom CTA bar */}
      {createPortal(
        <div className="fixed bottom-14 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold font-mono text-text-primary">
                  {formatZAR(price)}
                </span>
                <PriceChange change={asset.change24h ?? 0} size="sm" />
              </div>
            </div>
            <button
              onClick={() => setShowOrderSheet(true)}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors"
            >
              Buy / Sell
            </button>
          </div>
        </div>,
        document.body
      )}

      <MobileOrderSheet
        isOpen={showOrderSheet}
        onClose={() => setShowOrderSheet(false)}
        asset={asset}
        currentPrice={price}
      />
    </div>
  )
}
