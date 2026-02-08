export function generateOrderBook(midPrice) {
  const spread = midPrice * 0.001
  const bids = []
  const asks = []

  for (let i = 0; i < 8; i++) {
    const bidPrice = midPrice - spread * (i + 1)
    const askPrice = midPrice + spread * (i + 1)
    const bidSize = Math.round(50 + Math.random() * 200)
    const askSize = Math.round(50 + Math.random() * 200)

    bids.push({ price: Math.round(bidPrice * 100) / 100, size: bidSize })
    asks.push({ price: Math.round(askPrice * 100) / 100, size: askSize })
  }

  return { bids, asks: asks.reverse() }
}

export const tradeHistory = [
  { id: 1, price: 1850000, size: 0.025, side: 'buy', time: '21:45:12' },
  { id: 2, price: 1849800, size: 0.010, side: 'sell', time: '21:44:58' },
  { id: 3, price: 1850200, size: 0.050, side: 'buy', time: '21:44:31' },
  { id: 4, price: 1849500, size: 0.032, side: 'sell', time: '21:43:55' },
  { id: 5, price: 1850100, size: 0.015, side: 'buy', time: '21:43:20' },
  { id: 6, price: 1849900, size: 0.045, side: 'sell', time: '21:42:48' },
  { id: 7, price: 1850300, size: 0.020, side: 'buy', time: '21:42:10' },
  { id: 8, price: 1849700, size: 0.008, side: 'sell', time: '21:41:35' },
]
