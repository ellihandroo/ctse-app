# Project Status

## Current Phase

**Phase 1: Foundation** (Complete)

## Milestones

| Milestone              | Status   | Date       |
| ---------------------- | -------- | ---------- |
| Claude Code setup      | Complete | 2026-02-08 |
| Product spec drafted   | Complete | 2026-02-08 |
| Vite + React scaffold  | Complete | 2026-02-08 |
| Tailwind + design system | Complete | 2026-02-08 |
| Login + Router + Layout | Complete | 2026-02-08 |
| Dashboard              | Pending  | -          |
| Marketplace            | Pending  | -          |
| Asset Detail pages     | Pending  | -          |
| Trade / Order Book     | Pending  | -          |
| Wallet + Spend Card    | Pending  | -          |
| Earn page              | Pending  | -          |
| Corporate Actions      | Pending  | -          |
| Settings               | Pending  | -          |
| Deploy to Vercel       | Pending  | -          |

## Key Decisions

| Decision | Choice | Reason | Date |
| -------- | ------ | ------ | ---- |
| Claude Code patterns | Adapted from abantu-energy | Proven workflow | 2026-02-08 |
| Framework | React 18 + Vite 7 | Spec requirement | 2026-02-08 |
| Styling | TailwindCSS v4 (CSS-based config) | Spec requirement | 2026-02-08 |
| Charts | lightweight-charts + Recharts | TradingView-style + donut charts | 2026-02-08 |
| Data | All mock/hardcoded | POC demo, no backend needed | 2026-02-08 |
| Chain | Solana-only | Simplify POC, no multi-chain picker | 2026-02-08 |
| Dark mode | Trade screen only | Light mode = institutional credibility | 2026-02-08 |
| New screen | Earn page at /earn | Mirror Ondo USDY yield display | 2026-02-08 |
| Router | react-router-dom v7 | v6 API compatible, latest stable | 2026-02-08 |

## Architecture Notes

- Single-page React app, no backend
- Mock data in `src/data/` files
- React Context for user state and theme
- Light mode default, dark mode toggle on trade screen only
- Deploy as static site on Vercel with custom domain ctse.app
- Tailwind v4 uses CSS @theme directive (not tailwind.config.js)
- All routes protected via ProtectedRoute wrapper (redirects to login)

## Phase 1 Deliverables

- Vite + React scaffold with all deps (react-router, tailwind, lucide, charts)
- Custom Tailwind theme: CTSE green, Inter font, surface/border/text tokens
- Design system: Button, Card, Badge, PriceChange, Sparkline, Modal
- Context providers: UserContext (login/logout), ThemeContext (dark mode)
- Layout: Navbar (FSCA badge, search, profile), Sidebar (desktop), MobileNav (bottom tabs)
- Login page: 3 demo accounts, CTSE branding, FSCA badge
- Router: all 10 routes with placeholder pages
- Mock data: users, equities, tokenized assets, crypto, predictions, perpetuals, earn options
- Utility functions: formatZAR, formatUSD, formatChange, formatCompact, formatAPY
- Build verified: production build + dev server working

## Next: Phase 2 — Core Screens

Priority order (per competitive research — marketplace is the "wow" screen):
1. **Marketplace** — hero screen with unified tabs, asset cards, search, filtering
2. **Dashboard** — portfolio value, donut chart, asset list, recent activity
3. **Asset Detail pages** — equity, tokenized property, prediction market views
4. **Full mock data integration**
