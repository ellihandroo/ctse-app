export const earnOptions = [
  {
    id: 'ezar-earn',
    symbol: 'eZAR',
    name: 'eZAR Stablecoin',
    apy: 8.5,
    backing: 'SA Treasury backing',
    tvl: 250000000,
    minDeposit: 100,
    currency: 'ZAR',
    description: 'Earn yield on your Rand-pegged stablecoin, backed by South African Treasury bills.',
  },
  {
    id: 'ctse-usd-earn',
    symbol: 'CTSE-USD',
    name: 'CTSE Dollar',
    apy: 5.2,
    backing: 'US Treasury backing',
    tvl: 50000000,
    minDeposit: 10,
    currency: 'USD',
    description: 'Dollar-denominated yield backed by short-term US Treasury securities.',
  },
  {
    id: 'usdc-earn',
    symbol: 'USDC',
    name: 'USD Coin',
    apy: 4.1,
    backing: 'DeFi lending',
    tvl: 45000000000,
    minDeposit: 1,
    currency: 'USD',
    description: 'Variable yield from decentralized lending protocols.',
  },
]

export const userEarnings = {
  totalDeposited: 125000,
  accruedYield: 3240,
  projectedAnnual: 10625,
  deposits: [
    { asset: 'eZAR', amount: 100000, apy: 8.5, earned: 2890 },
    { asset: 'CTSE-USD', amount: 25000, apy: 5.2, earned: 350 },
  ],
}
