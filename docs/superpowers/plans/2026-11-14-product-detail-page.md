# Product Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать SEO-совместимый универсальный шаблон страницы товара с интерактивной галереей, подтвержденными контактами и безопасной обработкой пустых данных.

**Architecture:** Серверный App Router route получает товар, категорию и подкатегорию из существующих `lib/data.ts`, а чистые функции в `lib/product-detail.ts` формируют представление и похожие товары. Клиентские `ProductGallery` и `ProductContactActions` изолируют только интерактивность; production-данные остаются пустыми.

**Tech Stack:** Next.js 14 App Router, TypeScript, React 18, Tailwind CSS, Vitest, GitHub Pages static export.

**Spec:** `docs/superpowers/specs/2026-11-14-product-detail-page-design.md`

## Global Constraints

- Не добавлять цены, составы, характеристики, остатки, адреса, контакты или фотографии без подтвержденного источника.
- `products` и `productSlugs` остаются пустыми до отдельного задания.
- Не создавать корзину, оплату, публичную имитацию админки, Supabase или backend.
- Сохранить шесть категорий, 26 подкатегорий, текущий поиск, фильтры, сортировку и общие layout-компоненты.
- Перед публикацией выполнить `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Review Focus

- Пустой каталог и пустые фотографии не показывают фиктивную карточку, цену или пустой блок похожих товаров.
- Цена `null` показывает ровно `Цену уточняйте`, а `0` не считается подтвержденной ценой.
- Touch-свайп, клавиатурное управление и dialog галереи не создают горизонтальный overflow.
- В контактных действиях есть только подтвержденный телефон; неподтвержденные мессенджеры отсутствуют.
- Динамический route и `generateMetadata` не создают ссылок/страниц для несуществующих товаров.

### Task 1: Product detail domain helpers

**Files:**
- Create: `lib/product-detail.test.ts`
- Create: `lib/product-detail.ts`
- Modify: `lib/types.ts` only if a missing optional field is required by the existing model

**Interfaces:**
- `formatProductPrice(product: Product): string`
- `getProductAvailabilityLabel(status: AvailabilityStatus): string`
- `getProductInquiryMessage(productName: string): string`
- `getSimilarProducts(product: Product, allProducts: Product[], limit?: number): Product[]`

- [ ] Write failing tests for null/zero prices, labels, exact inquiry copy, same-subcategory preference, category fallback, current-product exclusion, and no-results.
- [ ] Run `npm test -- lib/product-detail.test.ts` and confirm failure because helpers do not exist.
- [ ] Implement the minimal pure helpers with no production fixtures.
- [ ] Run the focused test and then `npm test`.
- [ ] Commit the domain helper change.

### Task 2: Gallery and contact interaction

**Files:**
- Create: `components/product-gallery.tsx`
- Create: `components/product-contact-actions.tsx`
- Modify: `app/globals.css` for narrowly scoped gallery/dialog styles only if Tailwind utilities are insufficient

**Interfaces:**
- `ProductGallery({ product }: { product: Product })`
- `ProductContactActions({ productName }: { productName: string })`

- [ ] Add tests for rendered labels/copy via pure helper coverage and keep browser-only behavior accessible with semantic buttons/dialog.
- [ ] Implement main image, thumbnails, previous/next controls, keyboard controls, dialog zoom, touch swipe, and placeholder fallback without distortion.
- [ ] Implement inquiry copy action and `tel:+79275905588`; no unsupported messenger link.
- [ ] Run `npm test`, typecheck, and a local browser smoke at desktop and 390px.
- [ ] Commit the interaction components.

### Task 3: Route composition and metadata

**Files:**
- Modify: `app/catalog/[category]/[subcategory]/[product]/page.tsx`
- Modify: `components/contact-buttons.tsx` only if the existing unused placeholder must be replaced without affecting other routes

**Interfaces:**
- `generateStaticParams()` continues to use `getProductRouteParams()` and the neutral `__empty__` path.
- `generateMetadata({ params }): Promise<Metadata>` returns product-specific title/description only for valid products.

- [ ] Add route-level tests or source assertions for breadcrumbs, optional fields, tags, similar-products conditional rendering, price fallback, and CTA links.
- [ ] Compose the server route with `PageHeading`, `ProductGallery`, `ProductContactActions`, `ProductCard`, and existing layout styles.
- [ ] Keep the neutral empty state for the current empty production catalog.
- [ ] Run the full test suite and production build.
- [ ] Commit the route composition.

### Task 4: Visual and publication gates

**Files:**
- Modify: only files from Tasks 1–3 plus a documentation note if needed

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build` and inspect generated static routes.
- [ ] Run `git diff --check` and inspect the diff for unrelated changes.
- [ ] Start a local preview and verify desktop plus 390px: no horizontal overflow, gallery controls, dialog close, phone link, breadcrumbs, and empty production state.
- [ ] Commit, push the feature branch, wait for GitHub Pages workflow, and verify the public URL plus workflow result before reporting publication.
