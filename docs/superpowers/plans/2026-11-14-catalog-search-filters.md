# Catalog Search Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Реализовать поиск, совместные фильтры, сортировку и responsive UI каталога без реального ассортимента.

**Architecture:** Чистая функция `filterAndSortProducts` в `lib/catalog-filters.ts`; React-компонент `CatalogBrowser` хранит состояние и показывает карточки. Существующие данные/маршруты остаются источником товаров.

**Tech Stack:** Next.js App Router, React 18, TypeScript, Tailwind CSS, Vitest.

## Task 1: Search/filter/sort domain logic

**Files:** Create `lib/catalog-filters.ts`, `lib/catalog-filters.test.ts`.

- Write failing tests for case/locale-insensitive search across name/category/subcategory/description/characteristics; all joint filters; null-price behavior; all sort modes; available subcategories; and deduplicated collection derivation.
- Run focused tests and verify expected red failures.
- Implement minimal pure functions using existing `Product`, `Category`, `Subcategory`, and `Collection` types.
- Run focused tests and full suite.

## Task 2: Catalog browser UI

**Files:** Modify `components/catalog-browser.tsx`, `app/globals.css` if required.

- Write/extend component-level assertions only if existing test setup supports rendered client components; otherwise cover behavior through domain tests and static inspection.
- Add search, category/subcategory, meat type, purpose, availability, price range, sort, active filter chips, reset, count, empty state, and mobile filter toggle.
- Preserve existing card classes, keyboard focus rings, and empty unpublished-catalog message.
- Run typecheck/lint and a local browser smoke test at desktop/mobile widths.

## Task 3: Route integration and collections

**Files:** Modify `app/catalog/page.tsx`, `app/catalog/[category]/page.tsx`, `app/catalog/[category]/[subcategory]/page.tsx`, `app/collections/[collection]/page.tsx`, `lib/data.ts` only if helper integration is needed.

- Pass current scope/category/subcategory to the shared browser.
- Use derived collection logic without duplicating products or inventing data.
- Verify static route generation and unchanged empty pages.

## Task 4: Gates and publication

- Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and `git diff --check`.
- Inspect all changed paths and test existing route output.
- Commit/push only the feature diff; wait for GitHub Pages workflow and verify the published HTML/assets/UI.
