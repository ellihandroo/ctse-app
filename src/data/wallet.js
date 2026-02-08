export const brokerWallet = {
  balances: [
    { asset: 'eZAR', amount: 125000, value: 125000, apy: 8.5 },
    { asset: 'USDC', amount: 5200, value: 97344, apy: null },
    { asset: 'SOL', amount: 45.2, value: 189840, apy: null },
  ],
  recentIncome: [
    { id: 1, type: 'Dividend', source: 'BKB Ltd', amount: 2875, time: '1 day ago' },
    { id: 2, type: 'Yield', source: 'eZAR Staking', amount: 534, time: '1 day ago' },
    { id: 3, type: 'Dividend', source: 'Township Wealth', amount: 1260, time: '7 days ago' },
  ],
}

export const spendWallet = {
  balance: 12450,
  cardNumber: '**** **** **** 4521',
  transactions: [
    { id: 1, merchant: 'Woolworths Food', amount: -342, time: 'Today, 14:30' },
    { id: 2, merchant: 'Uber SA', amount: -89, time: 'Today, 08:15' },
    { id: 3, merchant: 'Netflix', amount: -199, time: 'Yesterday' },
    { id: 4, merchant: 'Top Up from Broker', amount: 5000, time: '3 days ago' },
    { id: 5, merchant: 'Checkers', amount: -567, time: '4 days ago' },
  ],
}
