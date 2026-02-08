# CTSE.APP - Everything Exchange POC

## Project Overview

Build a proof-of-concept React application for the Cape Town Stock Exchange (CTSE) "Everything Exchange" — a unified platform demonstrating trading of traditional equities, tokenized real-world assets, cryptocurrencies, stablecoins, prediction markets, and perpetual futures.

**This is a clickable prototype with mock data, not a functional trading platform.**

- **Domain**: CTSE.APP (already purchased, will deploy to Vercel)
- **Timeline**: 2 weeks to shareholder meeting
- **Audience**: CTSE shareholders (TradFi-oriented, need to see credibility)

---

## Tech Stack

```
Framework: React 18 + Vite
Styling: TailwindCSS
Routing: React Router v6
Charts: lightweight-charts (TradingView) + Recharts
Icons: Lucide React
State: React Context + useState
Hosting: Vercel
```

---

## Design System

### Brand Direction
Light mode interface with CTSE green accent. Clean, institutional aesthetic — "BlackRock meets Robinhood". Signals credibility to TradFi shareholders while remaining modern.

### Color Palette (Tailwind config)

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode base
        background: '#ffffff',
        surface: '#f8f9fa',
        border: '#e5e7eb',

        // Brand
        primary: '#00a86b',        // CTSE Green
        'primary-hover': '#009960',
        'primary-light': '#e6f7f1',

        // Text
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',

        // Semantic
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',

        // Dark mode (for trading view)
        'dark-bg': '#0a0a0a',
        'dark-surface': '#141414',
        'dark-border': '#262626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Typography
- Font: Inter (import from Google Fonts)
- Headings: font-semibold
- Body: font-normal
- Numbers/prices: font-mono (for alignment)

### Component Patterns
- Cards: `bg-surface border border-border rounded-xl p-4`
- Buttons primary: `bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2`
- Buttons secondary: `bg-surface border border-border hover:bg-gray-100 rounded-lg px-4 py-2`
- Badges: `bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full`

---

## Project Structure

```
ctse-app/
├── public/
│   ├── favicon.ico
│   └── ctse-logo.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── PriceChange.jsx
│   │   │   ├── Sparkline.jsx
│   │   │   └── Modal.jsx
│   │   ├── dashboard/
│   │   │   ├── PortfolioValue.jsx
│   │   │   ├── PortfolioChart.jsx
│   │   │   ├── AssetList.jsx
│   │   │   └── RecentActivity.jsx
│   │   ├── marketplace/
│   │   │   ├── AssetCard.jsx
│   │   │   ├── FilterTabs.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── trading/
│   │   │   ├── PriceChart.jsx
│   │   │   ├── OrderBook.jsx
│   │   │   ├── OrderForm.jsx
│   │   │   └── TradeHistory.jsx
│   │   ├── wallet/
│   │   │   ├── WalletCard.jsx
│   │   │   ├── BalanceRow.jsx
│   │   │   └── TransactionList.jsx
│   │   └── predictions/
│   │       ├── PredictionCard.jsx
│   │       └── OutcomeBar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Marketplace.jsx
│   │   ├── AssetDetail.jsx
│   │   ├── Trade.jsx
│   │   ├── MyAssets.jsx
│   │   ├── Wallet.jsx
│   │   ├── SpendCard.jsx
│   │   ├── CorporateActions.jsx
│   │   └── Settings.jsx
│   ├── data/
│   │   ├── users.js
│   │   ├── equities.js
│   │   ├── tokenizedAssets.js
│   │   ├── crypto.js
│   │   ├── predictions.js
│   │   └── perpetuals.js
│   ├── context/
│   │   ├── UserContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── usePortfolio.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## Mock Data

### Users (src/data/users.js)

```javascript
export const users = [
  {
    id: 1,
    name: 'Thabo Molefe',
    email: 'thabo@example.com',
    avatar: '/avatars/thabo.jpg',
    type: 'retail',
    portfolioValue: 847500,
    currency: 'ZAR',
  },
  {
    id: 2,
    name: 'Sarah van der Berg',
    email: 'sarah@example.com',
    avatar: '/avatars/sarah.jpg',
    type: 'hnw',
    portfolioValue: 12450000,
    currency: 'ZAR',
  },
  {
    id: 3,
    name: 'Kgomotso Capital',
    email: 'info@kgomotso.co.za',
    avatar: '/avatars/kgomotso.jpg',
    type: 'institutional',
    portfolioValue: 156000000,
    currency: 'ZAR',
  },
];
```

### Equities (src/data/equities.js)

```javascript
export const equities = [
  {
    id: 'bkb',
    symbol: 'BKB',
    name: 'BKB Ltd',
    sector: 'Agriculture',
    price: 1245,
    change24h: 2.3,
    marketCap: 2800000000,
    volume24h: 15600000,
    pe: 12.4,
    dividendYield: 2.3,
    description: 'Leading South African agricultural company.',
    sparkline: [1200, 1210, 1225, 1218, 1230, 1245],
  },
  {
    id: 'grindrod',
    symbol: 'GND',
    name: 'Grindrod Limited',
    sector: 'Investment Holdings',
    price: 890,
    change24h: -1.2,
    marketCap: 5200000000,
    volume24h: 23400000,
    pe: 8.7,
    dividendYield: 3.1,
    description: 'Diversified investment holding company.',
    sparkline: [910, 905, 895, 900, 888, 890],
  },
  {
    id: 'nwhale',
    symbol: 'NWH',
    name: 'Nurse Whale Holdings',
    sector: 'Healthcare',
    price: 3450,
    change24h: 0.8,
    marketCap: 1200000000,
    volume24h: 8900000,
    pe: 18.2,
    dividendYield: 1.5,
    description: 'Healthcare services and facilities operator.',
    sparkline: [3400, 3420, 3410, 3435, 3440, 3450],
  },
  {
    id: 'twnwealth',
    symbol: 'TWW',
    name: 'Township Wealth',
    sector: 'Real Estate',
    price: 567,
    change24h: 4.2,
    marketCap: 890000000,
    volume24h: 5600000,
    pe: 9.8,
    dividendYield: 4.5,
    description: 'Township retail and residential property developer.',
    sparkline: [540, 545, 550, 555, 560, 567],
  },
  {
    id: 'infrasa',
    symbol: 'ISA',
    name: 'Infrastructure SA',
    sector: 'Infrastructure',
    price: 2100,
    change24h: -0.5,
    marketCap: 3400000000,
    volume24h: 12300000,
    pe: 14.1,
    dividendYield: 2.8,
    description: 'Infrastructure development and management.',
    sparkline: [2120, 2115, 2108, 2105, 2102, 2100],
  },
];
```

### Tokenized Assets (src/data/tokenizedAssets.js)

```javascript
export const tokenizedAssets = [
  {
    id: 'sandton-tower',
    symbol: 'SNDT',
    name: 'Sandton Office Tower',
    type: 'real-estate',
    category: 'Commercial',
    location: 'Sandton, Johannesburg',
    image: '/properties/sandton-tower.jpg',
    valuation: 850000000,
    tokenPrice: 850,
    totalTokens: 1000000,
    availableTokens: 245000,
    annualYield: 7.2,
    change24h: 0.3,
    description: 'Premium Grade A office space in Sandton CBD.',
    occupancyRate: 94,
  },
  {
    id: 'cape-winelands',
    symbol: 'CWNE',
    name: 'Cape Winelands Estate',
    type: 'real-estate',
    category: 'Residential',
    location: 'Stellenbosch, Western Cape',
    image: '/properties/cape-winelands.jpg',
    valuation: 45000000,
    tokenPrice: 450,
    totalTokens: 100000,
    availableTokens: 12000,
    annualYield: 5.8,
    change24h: 1.1,
    description: 'Luxury residential estate in the Cape Winelands.',
    occupancyRate: 100,
  },
  {
    id: 'sa-tbond-2030',
    symbol: 'SATB30',
    name: 'SA Treasury Bond 2030',
    type: 'bond',
    category: 'Government Bond',
    maturityDate: '2030-12-31',
    tokenPrice: 98.50,
    totalTokens: 5000000,
    availableTokens: 890000,
    annualYield: 9.1,
    change24h: 0.1,
    description: 'Tokenized South African government bond.',
    couponRate: 8.75,
  },
  {
    id: 'solar-limpopo',
    symbol: 'SOLP',
    name: 'Solar Farm Limpopo',
    type: 'real-estate',
    category: 'Renewable Energy',
    location: 'Polokwane, Limpopo',
    image: '/properties/solar-limpopo.jpg',
    valuation: 120000000,
    tokenPrice: 120,
    totalTokens: 1000000,
    availableTokens: 340000,
    annualYield: 11.2,
    change24h: 0.0,
    description: '50MW solar installation with 20-year Eskom PPA.',
    capacityMW: 50,
  },
];
```

### Crypto & Stablecoins (src/data/crypto.js)

```javascript
export const crypto = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 1850000,
    priceUSD: 98500,
    change24h: 3.2,
    marketCap: 1940000000000,
    volume24h: 45000000000,
    sparkline: [1780000, 1795000, 1810000, 1825000, 1840000, 1850000],
    isStablecoin: false,
    apy: null,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 58400,
    priceUSD: 3120,
    change24h: 2.1,
    marketCap: 375000000000,
    volume24h: 18000000000,
    sparkline: [56800, 57200, 57600, 58000, 58200, 58400],
    isStablecoin: false,
    apy: null,
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 4200,
    priceUSD: 224,
    change24h: 5.8,
    marketCap: 108000000000,
    volume24h: 4500000000,
    sparkline: [3900, 4000, 4050, 4100, 4150, 4200],
    isStablecoin: false,
    apy: null,
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    price: 18.72,
    priceUSD: 1.00,
    change24h: 0.0,
    marketCap: 45000000000,
    volume24h: 8000000000,
    sparkline: [18.72, 18.72, 18.72, 18.72, 18.72, 18.72],
    isStablecoin: true,
    apy: null,
  },
  {
    id: 'ezar',
    symbol: 'eZAR',
    name: 'eZAR Stablecoin',
    price: 1.00,
    priceUSD: 0.053,
    change24h: 0.0,
    marketCap: 250000000,
    volume24h: 45000000,
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    isStablecoin: true,
    apy: 8.5,
    apySource: 'SA Treasury backing',
  },
  {
    id: 'ctse-usd',
    symbol: 'CTSE-USD',
    name: 'CTSE Dollar',
    price: 18.72,
    priceUSD: 1.00,
    change24h: 0.0,
    marketCap: 50000000,
    volume24h: 12000000,
    sparkline: [18.72, 18.72, 18.72, 18.72, 18.72, 18.72],
    isStablecoin: true,
    apy: 5.2,
    apySource: 'US Treasury backing',
  },
];
```

### Prediction Markets (src/data/predictions.js)

```javascript
export const predictions = [
  {
    id: 'rand-july-2026',
    title: 'Rand stronger than R18.50/USD on 1 July 2026?',
    category: 'Economics',
    description: 'Will the South African Rand be trading below R18.50 per US Dollar at market close on July 1st, 2026?',
    expiryDate: '2026-07-01',
    yesPrice: 0.34,
    noPrice: 0.66,
    volume24h: 2450000,
    totalVolume: 18500000,
    liquidity: 5200000,
  },
  {
    id: 'loadshedding-2026',
    title: '100 days without loadshedding by Dec 2026?',
    category: 'Politics',
    description: 'Will South Africa achieve 100 consecutive days without loadshedding before December 31st, 2026?',
    expiryDate: '2026-12-31',
    yesPrice: 0.12,
    noPrice: 0.88,
    volume24h: 890000,
    totalVolume: 8900000,
    liquidity: 2100000,
  },
  {
    id: 'sarb-may-2026',
    title: 'SARB to cut repo rate at May 2026 MPC?',
    category: 'Economics',
    description: 'Will the South African Reserve Bank announce a repo rate cut at the May 2026 Monetary Policy Committee meeting?',
    expiryDate: '2026-05-21',
    yesPrice: 0.58,
    noPrice: 0.42,
    volume24h: 1200000,
    totalVolume: 6700000,
    liquidity: 1800000,
  },
  {
    id: 'springboks-rc-2026',
    title: 'Springboks to win 2026 Rugby Championship?',
    category: 'Sports',
    description: 'Will the South African Springboks win the 2026 Rugby Championship?',
    expiryDate: '2026-10-05',
    yesPrice: 0.45,
    noPrice: 0.55,
    volume24h: 3400000,
    totalVolume: 24000000,
    liquidity: 6500000,
  },
];
```

### Perpetual Futures (src/data/perpetuals.js)

```javascript
export const perpetuals = [
  {
    id: 'btc-perp',
    symbol: 'BTC-PERP',
    name: 'Bitcoin Perpetual',
    underlying: 'BTC',
    markPrice: 1850000,
    indexPrice: 1849500,
    fundingRate: 0.0012,
    nextFunding: '2026-02-08T16:00:00Z',
    volume24h: 45000000000,
    openInterest: 12000000000,
    change24h: 3.2,
    maxLeverage: 20,
  },
  {
    id: 'eth-perp',
    symbol: 'ETH-PERP',
    name: 'Ethereum Perpetual',
    underlying: 'ETH',
    markPrice: 58400,
    indexPrice: 58350,
    fundingRate: 0.0008,
    nextFunding: '2026-02-08T16:00:00Z',
    volume24h: 18000000000,
    openInterest: 5600000000,
    change24h: 2.1,
    maxLeverage: 20,
  },
  {
    id: 'sol-perp',
    symbol: 'SOL-PERP',
    name: 'Solana Perpetual',
    underlying: 'SOL',
    markPrice: 4200,
    indexPrice: 4195,
    fundingRate: 0.0015,
    nextFunding: '2026-02-08T16:00:00Z',
    volume24h: 4500000000,
    openInterest: 1200000000,
    change24h: 5.8,
    maxLeverage: 10,
  },
];
```

---

## Screen Specifications

### 1. Login Page

**Route**: `/`

**Layout**:
- Centered card on light background
- CTSE logo at top
- "FSCA Regulated Exchange" badge
- Three demo account cards to click
- Each card shows: avatar, name, account type badge, portfolio value
- Click card -> navigate to `/dashboard`

**No authentication required** — just set user in context and redirect.

### 2. Dashboard

**Route**: `/dashboard`

**Layout**:
- Navbar at top (logo, search, notifications, profile dropdown)
- Sidebar on left (desktop) / Bottom nav (mobile)
- Main content area

**Components**:
1. **Portfolio Value Card**
   - Large number: "R847,500.00"
   - 24h change: "+R12,450 (+1.5%)" in green
   - USD toggle: "~$45,240"
   - Sparkline showing 7-day trend

2. **Quick Actions**
   - Deposit, Send, Trade buttons

3. **Portfolio Breakdown**
   - Donut chart by asset type
   - Legend: Equities, Tokenized Assets, Crypto, Stablecoins

4. **Asset List**
   - Table/cards showing each holding
   - Columns: Asset, Type badge, Holdings, Value, 24h change, APY (if applicable)
   - Click row -> navigate to asset detail

5. **Recent Activity**
   - List of recent transactions
   - Icon, description, amount, time

### 3. Marketplace

**Route**: `/marketplace`

**Layout**:
- Filter tabs: All | Equities | Tokenized | Crypto | Predictions | Futures
- Search bar
- Grid of asset cards

**Asset Card**:
- Logo/image
- Name + Symbol
- Price in ZAR
- 24h change (color-coded)
- APY badge if yield-bearing
- Mini sparkline
- "24/7" badge for crypto
- Click -> navigate to `/asset/:id`

### 4. Asset Detail - Equity

**Route**: `/asset/:id` (when type is equity)

**Layout**:
- Back button
- Header: Logo, Name, Symbol, Price, 24h change
- Price chart (candlestick or line, with timeframe toggles: 1D, 1W, 1M, 1Y)
- Key stats grid: Market Cap, Volume, P/E, Dividend Yield
- About section
- Order book preview (top 5 bids/asks)
- Buy/Sell buttons -> navigate to `/trade/:id`

### 5. Asset Detail - Tokenized Property

**Route**: `/asset/:id` (when type is tokenized real-estate)

**Layout**:
- Property image (hero)
- Name, Location, Valuation
- Token price, Your holdings, Total value
- **Annual Yield: 7.2% APY** (prominent)
- Stats: Occupancy rate, Total tokens, Available tokens
- "Use as Collateral" button -> modal showing borrowing power
- "View on Chain" link (mock Solana explorer URL)
- Buy/Sell buttons

### 6. Asset Detail - Prediction Market

**Route**: `/asset/:id` (when type is prediction)

**Layout**:
- Event title (large)
- Category badge
- Description
- Expiry countdown: "Expires in 143 days"
- **Outcome bars**:
  - YES: 34c [======----] 34%
  - NO: 66c [==========----] 66%
- Volume: R18.5M total, R2.4M 24h
- Your position (if any)
- "Buy YES" / "Buy NO" buttons

### 7. Trade / Order Book

**Route**: `/trade/:id`

**Layout**:
- Dark mode toggle (this screen can be dark for traders)
- Split view:
  - Left: Order book (bids green, asks red)
  - Center: Price chart (TradingView style)
  - Right: Order form

**Order Form**:
- Tabs: Limit | Market
- Side: Buy | Sell toggle
- Amount input
- Price input (for limit)
- Total calculation
- "Place Order" button

**Below**:
- Open orders table
- Trade history

### 8. My Assets (Personal Tokenized)

**Route**: `/my-assets`

**Layout**:
- Header: "Your Tokenized Assets"
- Cards for each personal asset:
  - Property image
  - Address: "23 Maple Street, Constantia"
  - Equity tokenized: R4,200,000
  - Token symbol: MAPLE-23
  - "Use as Collateral" -> modal:
    - Collateral value: R4,200,000
    - LTV ratio: 50%
    - Borrowing power: R2,100,000
    - Available to borrow in: eZAR, USDC
  - "View on Chain" link

### 9. Wallet

**Route**: `/wallet`

**Layout**:
- Two wallet cards side by side:

**Broker Wallet** (left):
- "For investments & earnings"
- Balance breakdown:
  - eZAR: R125,000 (earning 8.5% APY)
  - USDC: $5,200
  - SOL: 45.2 SOL
- Recent dividends/income list
- Deposit/Withdraw buttons

**Spend Wallet** (right):
- "For daily spending"
- Card balance: R12,450
- Linked to virtual card
- Recent spend transactions
- "Top Up" button (from broker wallet)

### 10. Spend Card

**Route**: `/card`

**Layout**:
- Virtual card display:
  - CTSE branding
  - Card number (masked): **** **** **** 4521
  - Cardholder name
  - Expiry
  - Green accent color
- Card balance: R12,450
- "Add to Apple Wallet" / "Add to Google Pay" buttons
- Freeze card toggle
- Recent transactions list

### 11. Corporate Actions

**Route**: `/corporate`

**Layout**:
- Tabs: Active Votes | Announcements

**Active Votes**:
- Cards for each vote:
  - Company name + logo
  - Resolution title
  - Description snippet
  - Deadline countdown
  - Your shares: 150
  - Vote buttons: FOR | AGAINST | ABSTAIN
  - "View Details" link

**Announcements** (SENS-style):
- List of announcements:
  - Timestamp
  - Company
  - Title
  - Category badge (Results, Trading Statement, Director Dealings, etc.)
  - Click to expand full text

### 12. Settings

**Route**: `/settings`

**Layout**:
- Profile section:
  - Avatar, Name, Email
  - Account type badge

- Preferences:
  - Currency: ZAR / USD dropdown
  - Theme: Light / Dark (for trading) toggle
  - Notifications toggles

- Security:
  - Change password (mock)
  - 2FA status (mock)

- About:
  - App version
  - "FSCA Regulated" badge
  - Support link

---

## Key UI Components to Build First

1. **Button** - primary, secondary, ghost variants
2. **Card** - with hover states
3. **Badge** - for asset types, APY, status
4. **PriceChange** - shows +/-% with color
5. **Sparkline** - mini chart for asset cards
6. **Navbar** - logo, search, user menu
7. **Sidebar** - navigation links with icons
8. **Modal** - for collateral, confirmations

---

## Utility Functions (src/utils/formatters.js)

```javascript
// Format ZAR currency
export const formatZAR = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format USD currency
export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format percentage change
export const formatChange = (change) => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

// Format large numbers (1.2M, 3.4B)
export const formatCompact = (num) => {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
};

// Format APY
export const formatAPY = (apy) => {
  return `${apy.toFixed(1)}% APY`;
};
```

---

## Build Order

### Phase 1: Foundation (Days 1-2)
1. Scaffold Vite + React project
2. Configure Tailwind with custom theme
3. Create design system components (Button, Card, Badge)
4. Build Navbar and Sidebar layout
5. Implement Login page with user selection
6. Set up React Router and UserContext

### Phase 2: Core Screens (Days 3-6)
1. Dashboard with portfolio overview
2. Marketplace with filtering
3. Asset detail pages (all three types)
4. Mock data integration

### Phase 3: Trading & Wallet (Days 7-9)
1. Trade/Order book interface
2. Wallet with dual structure
3. Spend card page
4. My Assets (personal tokenized)

### Phase 4: Polish (Days 10-14)
1. Corporate actions
2. Settings
3. Responsive design fixes
4. Loading states and transitions
5. Deploy to Vercel

---

## Important Notes

- **This is a demo** — no real trading, no real blockchain, no real money
- **Mock everything** — data is hardcoded, no API calls
- **Focus on UX** — smooth transitions, clear information hierarchy
- **Mobile-responsive** — should work on phones for shareholder demos
- **Light mode default** — signals institutional credibility
- **FSCA badge everywhere** — it's our competitive moat
- **Show APY prominently** — differentiator vs competitors

---

## Deployment

1. Push to GitHub repo
2. Connect to Vercel
3. Add custom domain: CTSE.APP
4. Ensure HTTPS is enabled
5. Test on mobile devices
