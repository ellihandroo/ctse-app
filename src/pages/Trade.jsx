import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { findAssetById } from '../data/allAssets'
import { generateOrderBook, tradeHistory } from '../data/orderbook'
import OrderBook from '../components/trading/OrderBook'
import OrderForm from '../components/trading/OrderForm'
import TradeHistory from '../components/trading/TradeHistory'
import Sparkline from '../components/common/Sparkline'
import PriceChange from '../components/common/PriceChange'
import Button from '../components/common/Button'
import { formatZAR } from '../utils/formatters'

function getPrice(asset) {
  if (!asset) return 0
  return asset.markPrice || asset.tokenPrice || asset.price || 0
}

export default function Trade() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode, setDark } = useTheme()

  const asset = findAssetById(id)
  const price = getPrice(asset)

  const orderBook = useMemo(() => generateOrderBook(price), [price])

  useEffect(() => {
    setDark(true)
    return () => setDark(false)
  }, [setDark])

  if (!asset) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-400 mb-4">Asset not found</p>
        <Button variant="secondary" onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    )
  }

  return (
    <div className={`-m-4 md:-m-6 min-h-[calc(100vh-4rem)] ${isDarkMode ? 'bg-dark-bg text-white' : ''}`}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {(asset.symbol || '??').slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {asset.name || asset.title}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">{asset.symbol}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-mono text-white">
                    {formatZAR(price)}
                  </span>
                  {asset.change24h != null && (
                    <PriceChange change={asset.change24h} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDark(!isDarkMode)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-surface transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Trading layout — 3 panels on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-4">
          {/* Left: Order Book */}
          <div className="bg-dark-surface border border-dark-border rounded-xl p-3 order-2 lg:order-1 h-[400px] lg:h-[500px]">
            <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
          </div>

          {/* Center: Chart + Trade History */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            {/* Chart placeholder */}
            <div className="bg-dark-surface border border-dark-border rounded-xl p-4 flex-1 min-h-[300px] flex items-center justify-center">
              {asset.sparkline ? (
                <div className="w-full flex items-center justify-center">
                  <Sparkline
                    data={asset.sparkline}
                    width={500}
                    height={240}
                    strokeWidth={2}
                    color="#38B380"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">TradingView chart coming soon</p>
              )}
            </div>

            {/* Trade History */}
            <div className="bg-dark-surface border border-dark-border rounded-xl p-3">
              <TradeHistory trades={tradeHistory} />
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 order-3 lg:order-3">
            <OrderForm asset={asset} currentPrice={price} />
          </div>
        </div>
      </div>
    </div>
  )
}
