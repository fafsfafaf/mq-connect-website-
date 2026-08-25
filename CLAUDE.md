# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

This is a React 19 + Vite + TypeScript website for MQ-Connect (German D2D sales company). Files are at project root, not in `src/`.

```
├── App.tsx              # Root with lazy-loaded routes
├── index.tsx            # Entry point
├── constants.ts         # APP_CONFIG and navigation
├── types.ts             # Shared TypeScript types
├── components/
│   ├── ui/              # Base components (Button, Card, etc.)
│   ├── home/            # Homepage sections
│   ├── forms/           # Form layout (ContractFormLayout)
│   ├── Layout.tsx       # Header, footer, navigation
│   └── ApplicationQuiz.tsx  # Multi-step application form
├── pages/               # Route pages (lazy-loaded)
├── data/                # Static content (blogPosts, reels)
└── lib/utils.ts         # cn() utility for Tailwind classes
```

## Key Patterns

**Path Alias**: `@/` maps to project root (see `vite.config.ts` and `tsconfig.json`)

**Styling**: Tailwind CSS with brand color `#004e82`. Use `cn()` from `lib/utils.ts` for conditional classes:
```tsx
import { cn } from '@/lib/utils';
cn('base-class', condition && 'conditional-class', className)
```

**UI Components**: Button and Card support variants/sizes via props. See [Button.tsx](components/ui/Button.tsx) for variant options (`primary`, `secondary`, `outline`, `ghost`).

**Animations**: Framer Motion with `LazyMotion` + `domAnimation` for reduced bundle. Import `motion` directly.

**Forms**: Use `ContractFormLayout` for contract submission forms. Forms POST JSON to n8n webhooks. Webhook URLs are configured per form or use defaults.

**Routes**: German language paths (e.g., `/ueber-uns`, `/karriere`, `/bewerben`). All pages lazy-loaded in App.tsx.

## Configuration

- **constants.ts**: Company info (phone, email, hours), navigation links
- **tailwind.config.js**: Custom `brand` color palette, Inter font
- **vite.config.ts**: Vendor chunk splitting for react/framer-motion

## Deployment & Infrastructure

- **Production**: https://mq-connect.de — Vercel project `mq-connect-website`, auto-deploys from GitHub `main`. **Every push to `main` goes live.** Use a feature branch to get a Vercel preview URL first for risky changes.
- **vercel.json**: The four form rewrites (`/energie-formular` etc.) MUST stay above the catch-all `/(.*)` — Vercel matches rewrites top-down. The static HTML forms in `public/` are served directly, bypassing the SPA.
- **External services** (no `.env` needed to build):
  - Supabase Storage (project `ffrthxboliylsnbkxtmj`): hosts the two team videos referenced via public URLs in `data/reels.ts`.
  - n8n webhooks (`n8n.srv824470.hstgr.cloud`): ⚠️ host is OFFLINE (decommissioned VPS) — form submissions currently go nowhere. See HANDOVER.md.
  - Google Gemini API: called client-side from `components/ChatWidget.tsx` with a hardcoded key. ⚠️ Key is exposed in this public repo — rotate/restrict before relying on it.
- **Maintenance mode**: see runbook in HANDOVER.md (replace `index.html` itself; a rewrite-only approach does not cover `/`).
