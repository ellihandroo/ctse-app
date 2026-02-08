# Project Status

## Current Phase

**Phase 2: Core Screens** (Complete)

## Milestones

| Milestone              | Status   | Date       |
| ---------------------- | -------- | ---------- |
| Claude Code setup      | Complete | 2026-02-08 |
| Product spec drafted   | Complete | 2026-02-08 |
| Vite + React scaffold  | Complete | 2026-02-08 |
| Tailwind + design system | Complete | 2026-02-08 |
| Login + Router + Layout | Complete | 2026-02-08 |
| Marketplace            | Complete | 2026-02-08 |
| Dashboard              | Complete | 2026-02-08 |
| Asset Detail pages     | Complete | 2026-02-08 |
| Trade / Order Book     | Pending  | -          |
| Wallet + Spend Card    | Pending  | -          |
| Earn page              | Pending  | -          |
| Corporate Actions      | Pending  | -          |
| Settings               | Pending  | -          |
| Deploy to Vercel       | Pending  | -          |

## Key Decisions

| Decision | Choice | Reason | Date |
| -------- | ------ | ------ | ---- |
| Framework | React 19 + Vite 7 | Latest stable | 2026-02-08 |
| Styling | TailwindCSS v4 (CSS @theme) | No config file needed | 2026-02-08 |
| Charts | lightweight-charts + Recharts | TradingView + donut charts | 2026-02-08 |
| Brand color | #38B380 (matches logo) | Softer green, institutional feel | 2026-02-08 |
| Chain | Solana-only | Simplify POC | 2026-02-08 |
| Dark mode | Trade screen only | Light = credibility | 2026-02-08 |
| Router | react-router-dom v7 | v6 API compatible | 2026-02-08 |

## Architecture Notes

- Single-page React app, no backend
- Mock data in `src/data/` files + `allAssets.js` unified lookup
- React Context for user state and theme
- Responsive: sidebar (desktop), bottom nav (mobile)
- Asset detail renders different component per assetType

## Phase 2 Deliverables

- **Marketplace**: unified asset grid with FilterTabs (6 categories), SearchBar, AssetCard
  - Prediction cards: YES/NO outcome bars + expiry
  - Futures cards: leverage badge
  - Crypto cards: 24/7 indicator, APY badge
  - Sorted by volume, responsive 1/2/3 col grid
- **Dashboard**: PortfolioValue (ZAR/USD toggle), PortfolioChart (Recharts donut), AssetList (8 holdings), RecentActivity (5 entries), quick action buttons
- **Asset Detail pages**: 5 variants (Equity, Tokenized, Crypto, Prediction, Futures)
  - Shared: AssetHeader, PriceChartPlaceholder, StatsGrid
  - Tokenized: collateral modal, chain badge, location
  - Prediction: YES/NO bars, countdown timer, Buy YES/NO
  - Futures: leverage, funding rate, Long/Short

## Next: Phase 3 — Trading & Wallet

1. Trade/Order book interface (dark mode)
2. Wallet with dual structure (Broker + Spend)
3. Spend card page
4. My Assets (personal tokenized)
5. Earn page (stablecoin yields)
