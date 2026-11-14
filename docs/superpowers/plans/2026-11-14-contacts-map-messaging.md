# Contacts, Map, and Messaging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add verified phone/address contact routing, an exact-address Yandex map with fallback, and a safe extensible messaging configuration without inventing channels.

**Architecture:** Keep `storeContact` as the single source of truth. Add small shared contact/map components and make product inquiry actions consume active channel configuration; inactive channels never render as active links.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, Vitest, static GitHub Pages export.

**Spec:** `docs/superpowers/specs/2026-11-14-contacts-map-messaging-design.md`

## Global Constraints

- Do not add unconfirmed prices, products, hours, contacts, photos, or channel URLs.
- Do not change the catalog hierarchy or add cart, payment, admin, Supabase, or server messaging.
- Preserve responsive layout, keyboard navigation, and empty/fallback states.
- Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` before publication.

## Review Focus

- A missing messenger URL must not become a broken or fake active button — test inactive channels.
- An unavailable map must still expose the confirmed address and route — test fallback markup/links.
- Product text must be URL-encoded and visibly routed to a real channel only when active — test message generation and channel selection.
- Contact data must stay identical across shared consumers — test the single source.
- Mobile contact controls must not cover content — verify responsive screenshots/clicks.

### Task 1: Contact data and shared routing

**Files:**
- Modify: `lib/data.ts`
- Modify: `lib/product-detail.ts`
- Test: `lib/data.test.ts`, `lib/product-detail.test.ts`

- [ ] Add `storeContact.map`, `storeContact.route`, and typed `contactChannels` with null hrefs for Telegram, WhatsApp, Viber, and VK.
- [ ] Add failing tests for exact contact data, active-channel filtering, route URL, and encoded product message.
- [ ] Implement the minimal typed helpers and preserve existing product/catalog data.
- [ ] Run focused Vitest tests and then the full suite.

### Task 2: Shared contact UI and map fallback

**Files:**
- Create: `components/contact-links.tsx`, `components/yandex-map.tsx`
- Modify: `components/contact-buttons.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`
- Modify: `app/contacts/page.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] Add failing component/data assertions for phone, address, route, map iframe, fallback text, and inactive channel state.
- [ ] Implement accessible shared links and a responsive iframe using exact coordinates `46.304724, 44.312429`; provide visible fallback address/route content.
- [ ] Replace placeholders on contacts/home, add a compact mobile contact entry point, and keep header/footer contact details consistent.
- [ ] Run typecheck, lint, tests, and build.

### Task 3: Product inquiry routing and catalog CTAs

**Files:**
- Modify: `components/product-contact-actions.tsx`, `components/catalog-browser.tsx`, relevant catalog page components
- Test: `lib/product-detail.test.ts` and applicable component/data tests

- [ ] Add failing coverage for active-channel product links and the no-active-channel phone/copy fallback.
- [ ] Implement `ProductContactActions` so it opens a selected active channel with the exact product message, never claiming that copy sent it.
- [ ] Add shared contact CTA to key catalog empty/list states without changing the catalog hierarchy or product data.
- [ ] Verify keyboard behavior and mobile widths locally.

### Task 4: Release verification and publication

**Files:**
- Modify only files required by Tasks 1–3.

- [ ] Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `git diff --check`.
- [ ] Use a local production server/browser to check `/`, `/catalog`, `/contacts`, product route, phone links, route link, map fallback, and 390px layout.
- [ ] Commit the scoped diff, push the feature branch, create a PR, wait for checks, merge to `main`, and verify the GitHub Pages workflow and public URL.
