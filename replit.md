# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/morsegrid run e2e` — run Morsegrid Playwright e2e tests (auto-builds and serves via `vite preview`)
- `pnpm --filter @workspace/morsegrid run e2e:install` — install the Chromium browser used by Playwright

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Morsegrid artifact notes

- The legal pages at `/legal/privacy`, `/legal/terms`, and `/legal/dpa` use plain-language placeholder content authored in `artifacts/morsegrid/src/data/legal.ts`. They are illustrative only and have not been reviewed by counsel — replace before any real customer engagement.
- The `/security` Trust Center is a marketing page, not the actual SOC 2 audit report. The downloadable `public/security-one-pager.pdf` is a stub placeholder.
- Integration entries in `artifacts/morsegrid/src/data/integrations.ts` use styled wordmarks (initials on a colored tile) — not real third-party brand logos.

## Morsegrid SEO / Performance / A11y hardening (Task 17)

- Fonts self-hosted via `@fontsource-variable/geist` (imported from `src/main.tsx`); the Google Fonts `<link>` and `@import url(...)` were removed.
- `scripts/generate-images.mjs` uses `sharp` to emit AVIF/WebP/JPG hero variants at 1280/1920/2560 widths into `public/images/`, plus 1200x630 PNG OG cards for every industry, case study, and article slug into `public/og/<group>/<slug>.png`. Re-run with `node scripts/generate-images.mjs` whenever the hero photo or the data slug list changes.
- The home Hero renders a `<picture>` with AVIF + WebP `<source srcset>` and a JPG fallback (`fetchpriority="high"`); `index.html` preloads the AVIF set with `imagesrcset` so the LCP fetch starts before React mounts.
- Per-page metadata centralized in `src/hooks/use-page-meta.ts`. Accepts `{ title, description, path, image, type, jsonLd }` (legacy `(title, description)` still works); writes `<title>`, description, `og:*`, `twitter:*`, canonical link, plus JSON-LD. Always injects a site-wide `Organization` + `WebSite` block; pages add their own (`Article` for resources, `Product` for /products, `BreadcrumbList` for detail pages). Industry / case-study / article detail pages pass their generated `/og/.../<slug>.png` so social previews are unique per page.
- `public/robots.txt` allows all and points at the sitemap. A small Vite plugin in `vite.config.ts` (`sitemapPlugin()`) walks the route list and the `industries.ts` / `case-studies.ts` / `articles.ts` data files at build time and writes `dist/public/sitemap.xml`.
- All routes in `App.tsx` are lazy-loaded with `React.lazy` + `Suspense`. Home-page chunk is ~34 kB gzip; each other page is its own chunk.
- `useReducedMotion()` is honored in `FadeIn`, the route transition wrapper in `App.tsx`, the home `FinalCTA` ambient blob, the `Omnichannel` auto-cycle and caption transition, the home `StoryCarousel` and `ScrollTimeline` transitions, the `IndustryDetail` testimonial cycle, and the `CaseStudies` media/copy slide transitions.
- A11y: skip-to-main link in `Layout.tsx`; `<main id="main">` landmark; `aria-current="page"` + visible focus ring on nav links; mobile menu button has `aria-expanded` / `aria-controls` and a state-aware label; the broken industry-page "Watch video" button now links to `/case-studies` with a descriptive `aria-label`.

## Morsegrid analytics & e2e

- Privacy-respecting analytics via Plausible (no cookies, no consent banner). Script is injected only when `import.meta.env.PROD` is true and `siteConfig.analytics.plausibleDomain` is set in `artifacts/morsegrid/src/config/site.ts`. Swap the `plausibleDomain` / `plausibleSrc` there to repoint to a different property or self-hosted endpoint.
- Page views: `useTrackPageView()` in `App.tsx` fires `pageview` on every wouter route change.
- Tracked CTA events (via `track()` in `src/lib/analytics.ts`):
  - `nav_book_call` (Navbar primary CTA, mobile + desktop)
  - `nav_voice_open` (Navbar voice icon)
  - `nav_dropdown_open` (mega-menu first open, with `menu` label)
  - `nav_mobile_open` (mobile menu toggle)
  - `footer_link_click` (footer link clicks, with `label` + `href`)
  - `cta_hero_email_submit` (home hero email form, with email + utm params on the redirect URL)
  - `cta_difference`, `cta_evolves`, `cta_final` (home section CTAs)
  - `cta_case_study_video` (case-studies grid lightbox open, with `slug`)
  - `cta_talk_to_us` (case study detail page)
  - `cta_industry_hero_demo`, `cta_industry_watch_video`, `cta_industry_final_demo` (industry detail pages)
  - `cta_voice_modal_complete` (Voice modal final submit, with `had_transcript`)
- Playwright config: `artifacts/morsegrid/playwright.config.ts`. The `webServer` runs `vite build` then `vite preview` on port 4321. Override with `E2E_PORT`. Mobile-only specs are gated by the `@mobile` grep tag and run in the `mobile-chrome` project.

## Free Systemization Assessment (`/assessment`, `/assessment/report/:token`)
- Multi-step assessment lives in `artifacts/morsegrid/src/pages/assessment.tsx` (runner) and `assessment-report.tsx` (results). Questions, categories, weights, and tier thresholds in `src/data/assessment.ts`; pure scoring in `src/lib/assessment-scoring.ts`. Branching via `revealsWhen`. Answers persisted to `localStorage` (key `mg_assessment_v1`) and a `Start over` button clears it.
- Focused layout: `Layout.tsx` hides the global Navbar/Footer when the path starts with `/assessment` (the runner provides its own minimal header + bottom progress bar).
- Server: `artifacts/api-server/src/routes/assessment.ts` exposes `POST /api/assessment` (rate-limited, dedupes same email within 5 min) and `GET /api/assessment/:token`. In-memory `Map` store pruned at 5000 entries (mirrors the existing `leads` route — no DB). Server scoring lives in `src/lib/assessment.ts` (mirrors client logic so the report is generated server-side and shareable by token).
- Analytics: `src/lib/analytics.ts` wraps `gtag`/`dataLayer`. Events fired: `assessment_started`, `assessment_step_viewed`, `assessment_completed`, `assessment_report_viewed`.
- Entry points: `Assessment` link in `config/nav.ts`, `Free Assessment` link in the Footer Resources column, and a dedicated `AssessmentBand` section on the home page (between `StoryCarousel` and `Difference`) with sample-score ring and "Take Your Free Assessment" CTA.
