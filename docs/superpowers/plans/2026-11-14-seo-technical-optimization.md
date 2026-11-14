# SEO, performance and technical optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-safe SEO, indexing controls, structured data, analytics hooks and low-risk performance improvements to the static catalog.

**Architecture:** Centralize URL policy, metadata, JSON-LD and sitemap/robots decisions in `lib/seo.ts`; keep page copy in route metadata functions and use existing components for visible breadcrumbs. Add a small client analytics adapter that is inert without a configured counter.

**Tech Stack:** Next.js 14 App Router static export, TypeScript, React 18, Vitest, npm audit.

**Spec:** `docs/superpowers/specs/2026-11-14-seo-technical-optimization-design.md`

## Global Constraints

- Do not add unconfirmed products, prices, characteristics, availability, addresses, contacts or photos.
- Keep `products` and `productSlugs` empty.
- Do not change the existing design, route hierarchy or commercial scope.
- Do not use `npm audit fix --force`.
- Technical deployment remains noindex until an explicit production domain and index switch are configured.

## Review Focus

- Empty dynamic routes must render for static export but never enter sitemap or canonical indexable URLs — covered by SEO tests.
- GitHub Pages `basePath` must prefix generated absolute URLs — covered by URL tests and build inspection.
- Missing analytics id must produce no script and no runtime error — covered by analytics tests.
- Empty product/recipe data must produce no Product/Recipe schema — covered by structured data tests.
- Phone, messenger, route and product inquiry actions must retain behavior while emitting named events — covered by component/source tests and build.

### Task 1: SEO policy and metadata

**Files:** Create `lib/seo.ts`, `lib/seo.test.ts`; modify `next.config.mjs`, `app/layout.tsx`, page route files.

- [ ] Write failing tests for origin/basePath URL creation, noindex policy, page metadata, and omission of empty product/recipe URLs.
- [ ] Run `npm test -- lib/seo.test.ts` and confirm failure.
- [ ] Implement typed SEO helpers and route metadata using existing verified contact data only.
- [ ] Run the focused test and confirm pass.
- [ ] Add page-specific metadata and canonical/OG fields without changing visible markup.

### Task 2: Indexing, sitemap and structured data

**Files:** Create `app/robots.ts`, `app/sitemap.ts`, `components/structured-data.tsx`; modify routes/components.

- [ ] Add tests for robots disallow policy, public sitemap route set, BreadcrumbList and LocalBusiness payloads.
- [ ] Implement robots/sitemap with no empty technical routes and a production switch.
- [ ] Add JSON-LD for LocalBusiness/BreadcrumbList; gate Product and Recipe by non-empty confirmed data.
- [ ] Run focused tests and inspect generated static files.

### Task 3: Analytics and low-risk performance

**Files:** Create `components/analytics.tsx`, `lib/analytics.ts`; modify `app/layout.tsx`, contact/product/image components.

- [ ] Write failing tests for inert analytics without id and stable event names.
- [ ] Implement the optional Yandex Metrica loader and event helper; do not include a fabricated id or consent bypass.
- [ ] Instrument existing phone, route, messenger, product view and inquiry actions.
- [ ] Add `loading="lazy"`/`sizes` where safe and preserve priority only for the first product gallery image.
- [ ] Run focused tests and verify no layout or route changes.

### Task 4: Full verification and audit

**Files:** Modify only compatible lockfile/package files if a non-breaking audit fix is justified; create `docs/seo-technical-audit-2026-11-14.md`.

- [ ] Run typecheck, lint, tests, build, audit and `git diff --check`.
- [ ] Inspect static output for canonical, noindex, robots, sitemap, basePath and JSON-LD behavior.
- [ ] Apply only compatible dependency fixes after reviewing `npm audit`; never force-update major dependencies.
- [ ] Document exact findings, unresolved advisories, changed files and deployment limitations.
