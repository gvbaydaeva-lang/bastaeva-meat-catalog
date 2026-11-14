# Catalog Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Перевести существующий многостраничный каталог на шесть подтверждённых архитектурных категорий, URL подкатегорий и товаров, а также отдельные тематические подборки без фиктивного ассортимента.

**Architecture:** Сохранить Next.js App Router, текущие страницы и стили. Ввести типы `Subcategory` и `Collection`, хранить товар один раз с двумя ссылками на иерархию, а динамические страницы построить на общих карточках и хлебных крошках.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-14-catalog-architecture-design.md`

## Global Constraints

- Не менять существующий дизайн, стек и рабочие информационные страницы.
- Не добавлять реальные товары, цены, фото, характеристики, остатки или неподтверждённые коммерческие данные.
- Не добавлять Supabase, админ-панель, корзину, оплату или внешние интеграции.
- Сохранять адаптивность, доступность клавиатурной навигации и понятные пустые состояния.
- `/admin` удалить как неиспользуемую публичную заглушку.

## Review Focus

- Старые категории и sample-товары не должны попасть в данные или HTML — тест данных и проверка маршрутов в Task 1.
- Товар должен иметь ровно одну категорию и подкатегорию, но может входить в несколько подборок — тест связей в Task 1.
- Несуществующая категория, подкатегория или товар должны вести в `notFound()` — тесты helper-функций и маршрутов в Task 2.
- Длинные названия и пустые разделы не должны ломать карточки и мобильную сетку — сохраняется существующий CSS, проверка build и ручной smoke в Task 3.
- Ссылки хлебных крошек должны соответствовать реальной иерархии URL — тест helper-данных и маршрутная проверка в Task 2.

### Task 1: Data model and confirmed empty catalog

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/data.ts`
- Modify: `lib/data.test.ts`
- Modify: `lib/homepage.test.ts`

**Interfaces:**
- Produce `Subcategory`, `Collection`, expanded `Product`, `categories`, `subcategories`, `collections`, `products` and helpers `getSubcategory`, `getProductsBySubcategory`, `getCollection`, `getProductsByCollection`.

- [ ] Write failing tests asserting the exact six new category names/slugs, no sample products, the required subcategory coverage, valid product references, non-duplicated product storage, collection references, and empty commercial fields.
- [ ] Run `npm test -- lib/data.test.ts lib/homepage.test.ts` and confirm failure caused by the old categories/sample products and missing model.
- [ ] Implement the types and static data with neutral descriptions, empty product arrays, six category records, logical subcategory records for all categories, and six collection records with empty `productSlugs`.
- [ ] Implement lookup/filter helpers and keep recipes/contact data unchanged.
- [ ] Run the focused tests, then `npm test`, and confirm all pass.

### Task 2: Multi-level routes and navigation components

**Files:**
- Create: `app/catalog/[category]/[subcategory]/page.tsx`
- Create: `app/catalog/[category]/[subcategory]/[product]/page.tsx`
- Create: `app/collections/page.tsx`
- Create: `app/collections/[collection]/page.tsx`
- Modify: `app/catalog/[category]/page.tsx`
- Modify: `app/catalog/product/[slug]/page.tsx`
- Modify: `components/category-card.tsx`
- Modify: `components/product-card.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/catalog/page.tsx`
- Modify: `app/page.tsx`
- Modify: `lib/data.test.ts`

**Interfaces:**
- Consume the data helpers from Task 1.
- Produce static paths for category, subcategory, nested product, and collection routes; all product/detail pages use category → subcategory breadcrumbs.

- [ ] Add failing route/data assertions for generated path coverage and collection/product link identity.
- [ ] Run the focused tests and confirm failure before route implementation.
- [ ] Implement the two nested route levels and collection routes using `notFound()` for invalid params, shared `PageHeading`, `CategoryCard`, `ProductCard`, `PlaceholderMedia`, and empty-state copy.
- [ ] Update catalog/category/product pages and shared navigation to expose the new hierarchy and collections without changing visual classes or unrelated content.
- [ ] Remove the old flat product URL usage from rendered links while preserving a safe redirect-free not-found behavior for stale paths.
- [ ] Run tests and typecheck; resolve only errors caused by this scope.

### Task 3: Remove admin stub, update documentation, and verify

**Files:**
- Delete: `app/admin/page.tsx`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/superpowers/specs/2026-11-14-catalog-architecture-design.md`

- [ ] Update README and AGENTS with the final architecture, empty-data policy, route hierarchy, and explicit exclusion of admin/Supabase/cart/payment.
- [ ] Remove the public `/admin` stub and verify no links or imports reference it.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check` and inspect changed paths.
- [ ] Start the production app or dev server for a local route smoke check covering desktop/mobile navigation, category, subcategory, collection, and product URLs; report any browser verification that remains unavailable.
