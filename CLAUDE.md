# Project Instructions

## Rules for Claude

1. **Always check existing state first** - Before setting up or configuring anything, check if it's already done (e.g., `git status`, `git remote -v`, check for existing files)
2. **Read PROJECT_STATUS.md** - Check what's already been completed before suggesting work
3. **Ask before assuming** - If unsure whether something exists, check or ask
4. **NEVER modify git config** - Do not change `user.email` or `user.name`
5. **Branch before coding** - Create a feature branch BEFORE making any code changes. Never commit to main/master directly. This allows multiple Claude instances to work in parallel.
6. **Read PRODUCT_SPECIFICATION.md** for full screen specs, mock data schemas, and design system details before implementing any UI component.

## Resuming Work

When the user asks to "pick up where we left off", "continue", or "resume":

1. Run `gh issue list` - show open issues so nothing is forgotten
2. Read `SESSION.md` first - has "hot" context from last session (where we left off, immediate next steps)
3. Read `PROJECT_STATUS.md` for overall progress, decisions, and milestones
4. Read `PRODUCT_SPECIFICATION.md` if you need detailed requirements

## Project Overview

**Project:** CTSE.APP — Everything Exchange POC
**Domain:** ctse.app (purchased, deploying to Vercel)
**Description:** Clickable prototype for the Cape Town Stock Exchange "Everything Exchange" — a unified platform demonstrating trading of equities, tokenized real-world assets, crypto, stablecoins, prediction markets, and perpetual futures.
**Audience:** CTSE shareholders (TradFi-oriented, need to see credibility)
**Timeline:** 2 weeks to shareholder meeting

**This is a demo with mock data, not a functional trading platform.**

## Key Design Principles

- **Light mode default** — signals institutional credibility ("BlackRock meets Robinhood")
- **FSCA badge everywhere** — competitive moat
- **Show APY prominently** — differentiator vs competitors
- **Mobile-responsive** — shareholder demos on phones
- **Mock everything** — hardcoded data, no API calls

## Tech Stack

| Layer   | Technology                              | Hosting |
| ------- | --------------------------------------- | ------- |
| Framework | React 18 + Vite                       | Vercel  |
| Styling | TailwindCSS                             | -       |
| Routing | React Router v6                         | -       |
| Charts  | lightweight-charts (TradingView) + Recharts | -   |
| Icons   | Lucide React                            | -       |
| State   | React Context + useState                | -       |

## Brand

- Primary: `#00a86b` (CTSE Green)
- Font: Inter (Google Fonts)
- Numbers/prices: `font-mono`

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Sidebar, MobileNav
│   ├── common/        # Button, Card, Badge, PriceChange, Sparkline, Modal
│   ├── dashboard/     # PortfolioValue, PortfolioChart, AssetList, RecentActivity
│   ├── marketplace/   # AssetCard, FilterTabs, SearchBar
│   ├── trading/       # PriceChart, OrderBook, OrderForm, TradeHistory
│   ├── wallet/        # WalletCard, BalanceRow, TransactionList
│   └── predictions/   # PredictionCard, OutcomeBar
├── pages/             # Login, Dashboard, Marketplace, AssetDetail, Trade, etc.
├── data/              # Mock data (users, equities, crypto, predictions, etc.)
├── context/           # UserContext, ThemeContext
├── hooks/             # usePortfolio
└── utils/             # formatters (ZAR, USD, percentages, compact numbers)
```

## Key Files

- `SESSION.md` - Last session's "hot" context (overwritten each save)
- `PROJECT_STATUS.md` - Permanent progress, decisions, milestones
- `PRODUCT_SPECIFICATION.md` - Full product requirements, screen specs, mock data schemas

## Quick Commands

```bash
npm install           # Install all dependencies
npm run dev           # Run dev server
npm run build         # Production build
npm run preview       # Preview production build
```

## Development Workflow

### Starting a Task

When user gives you a task that requires code changes:

```bash
# 1. Pull latest main first
git checkout main && git pull

# 2. Create feature branch BEFORE coding
git checkout -b feature/short-description
```

### Recommended Flow

```
1. Work on feature/fix
2. /test              -> verify everything passes
3. /code-review       -> review the code
4. /commit            -> stage and commit
5. /save              -> before leaving or long break
```

## Build Phases

| Phase | Focus | Status |
| ----- | ----- | ------ |
| 1 | Foundation — scaffold, Tailwind, design system, layout, Login, Router | Pending |
| 2 | Core Screens — Dashboard, Marketplace, Asset Details, mock data | Pending |
| 3 | Trading & Wallet — Order book, Wallet, Spend Card, My Assets | Pending |
| 4 | Polish — Corporate Actions, Settings, responsive, transitions, deploy | Pending |

## Deployment

| Platform | App      | URL       | Root Directory |
| -------- | -------- | --------- | -------------- |
| Vercel   | Frontend | ctse.app  | `/`            |

### Deploy Steps

1. Push to GitHub repo
2. Connect to Vercel
3. Add custom domain: CTSE.APP
4. Ensure HTTPS is enabled
5. Test on mobile devices

## Bash Guidelines

**Avoid commands that cause output buffering issues:**

- DO NOT pipe through `head`, `tail`, `less`, or `more` when monitoring output
- Instead, let commands complete fully, or use `--max-lines` flags if supported
- For log monitoring, prefer reading files directly rather than piping through filters

**When checking command output:**

- Run commands directly without pipes when possible
- Use command-specific flags (e.g., `git log -n 10` instead of `git log | head -10`)
