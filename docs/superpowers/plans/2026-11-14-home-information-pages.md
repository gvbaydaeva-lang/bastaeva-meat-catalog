# Главная и информационные страницы Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Доработать главную и информационные разделы сайта ИП Бастаева А.Д. до визуально завершённого, но честного состояния без добавления неподтверждённого ассортимента и коммерческих данных.

**Architecture:** Сохранить текущие App Router-маршруты, общую шапку/подвал и дизайн-токены. Контентные структуры вынести в `lib/content.ts`, а повторяющиеся композиционные элементы — в небольшие компоненты. Пустые состояния должны быть явными, а блок популярных товаров — условным и основанным на `products`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, lucide-react, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-14-home-information-pages-design.md`

## Global Constraints

- Не менять архитектуру каталога, фильтры, карточки товаров и существующие рабочие маршруты.
- Не добавлять товары, цены, фотографии, составы, сертификаты, отзывы, график, тарифы и географию доставки без подтверждённого источника.
- Не создавать Supabase, админ-панель, корзину и онлайн-оплату.
- Сохранить адаптивность, доступность клавиатурной навигации и пустые состояния.
- Перед публикацией выполнить `npm run typecheck`, `npm run lint`, `npm test` и `npm run build`.

## Review Focus

- Пустой `products` не должен рендерить псевдотовары — тест: условие популярной витрины использует только опубликованные `popular` products.
- Пустой `recipes` не должен публиковать выдуманные карточки — тест: контентный массив рецептов пустой и страница имеет empty-state.
- Ссылки на шесть категорий должны сохранять текущие slug — тест: homepage content foundation.
- Мобильная навигация и фокус не должны исчезнуть при расширении header/footer — проверка локальным browser smoke.
- Статические страницы должны собираться без динамических неподдержанных данных — проверка production build.

### Task 1: Контентные модели и тесты пустых состояний

**Files:**
- Create: `lib/content.ts`
- Modify: `lib/types.ts`
- Modify: `lib/data.ts`
- Modify: `lib/homepage.test.ts`

**Interfaces:**
- Produce `homeTrustNotes`, `aboutSections`, `qualitySections`, `deliverySteps`, `recipeCategories` and `recipes` as confirmed-safe content data.
- Produce `getPopularProducts(products: Product[]): Product[]` returning only products tagged `popular`.

- [ ] Add failing tests for `getPopularProducts([])`, missing `popular` tags, and empty recipes.
- [ ] Run `npm test lib/homepage.test.ts` and confirm the new expectations fail for the missing helper/content.
- [ ] Implement the content data and helper without changing product normalization or catalog route data.
- [ ] Run the focused test and then `npm test`.
- [ ] Commit `feat: add safe content model for information pages`.

### Task 2: Shared informational sections

**Files:**
- Create: `components/info-section.tsx`
- Create: `components/empty-content.tsx`
- Modify: `components/page-heading.tsx`

**Interfaces:**
- `InfoSection` accepts eyebrow, title, description, optional children and tone.
- `EmptyContent` accepts label, title, description and optional href/action label.

- [ ] Add the reusable components using existing focus, spacing and palette tokens.
- [ ] Ensure all action links use the existing `Link`/route conventions and visible focus rings.
- [ ] Run `npm run typecheck`.
- [ ] Commit `feat: add shared information page sections`.

### Task 3: Homepage composition

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `lib/homepage.test.ts`

**Interfaces:**
- Keep `categories`, `collections`, `storeContact` and `products` as existing sources.
- Render category cards for all six categories, direct feature links for homemade semi-finished and national products, and popular cards only when `getPopularProducts(products)` is non-empty.

- [ ] Add/adjust tests for six category links, feature category links, and empty popular state.
- [ ] Run the focused test and confirm failure before implementation.
- [ ] Implement the homepage with a distinctive hero, varied sections, safe placeholders and responsive layouts.
- [ ] Run `npm test`, `npm run typecheck` and `npm run lint`.
- [ ] Commit `feat: complete homepage presentation`.

### Task 4: Information pages and recipe routes

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/quality/page.tsx`
- Modify: `app/delivery/page.tsx`
- Modify: `app/recipes/page.tsx`
- Create: `app/recipes/[slug]/page.tsx`
- Modify: `app/contacts/page.tsx`

**Interfaces:**
- Pages consume content from `lib/content.ts` and show explicit “материалы уточняются” states.
- Recipe detail route uses `generateStaticParams` from an empty-safe recipe list and calls `notFound()` for unavailable slugs.

- [ ] Add route/content tests for empty recipe list and safe information-page copy.
- [ ] Run focused tests and confirm failure for the new route expectations.
- [ ] Implement pages with varied layouts: editorial about, fact grid for quality, process steps for delivery, recipe grid/detail empty state, and contact CTA.
- [ ] Run `npm run typecheck`, `npm run lint` and `npm test`.
- [ ] Commit `feat: complete information pages and recipe shell`.

### Task 5: Verification, visual smoke, publication handoff

**Files:**
- Modify only files required by verification findings.

- [ ] Run `npm run build` first if `.next/types` is absent.
- [ ] Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` and `git diff --check`.
- [ ] Start local production server and check home, about, quality, delivery, recipes, recipe detail, contacts and catalog routes at desktop and mobile viewport sizes; verify menu, links, no horizontal overflow and empty states.
- [ ] Commit any final fixes with a focused message.
- [ ] Push `codex/bastaeva-home-info`; inspect GitHub Pages configuration and only report publication after a real workflow/public URL check.
