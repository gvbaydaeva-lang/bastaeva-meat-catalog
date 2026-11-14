# SEO, performance and technical optimization design

## Intent

Prepare the static Next.js catalog for careful search optimization without changing its visual design, inventing commercial data, or publishing empty product and recipe pages.

## Goals

- Provide reusable Russian metadata, canonical URLs and Open Graph data for public routes.
- Keep the technical GitHub Pages version out of search using both metadata and robots rules.
- Generate sitemap URLs only for real public routes and confirmed products/recipes.
- Add conservative Schema.org JSON-LD for the confirmed store contact, breadcrumbs, products and recipes.
- Prepare Yandex Metrica event instrumentation without a fake counter id or consent bypass.
- Improve image loading hints, lazy loading and accessible image alternative text without redesigning components.
- Document and test the indexing switch and basePath behavior.

## Non-goals and constraints

- No new products, prices, characteristics, availability, photos, reviews, ratings, opening hours or messenger URLs.
- No admin, database, cart, payment or other commercial feature.
- No design or route hierarchy changes.
- `products` and `recipes` remain empty until confirmed source data exists.
- The current technical deployment stays noindex; indexing requires explicit environment configuration for the primary domain.

## Approach

Use one small SEO module for site origin, indexing policy, metadata builders, sitemap paths and JSON-LD builders. Route files provide page-specific titles/descriptions and breadcrumbs through the existing `PageHeading` component. `app/sitemap.ts` and `app/robots.ts` are static-export compatible. A client-only analytics helper emits named events only when a real `NEXT_PUBLIC_YANDEX_METRIKA_ID` exists and is enabled; contact actions call it without changing their behavior.

## Acceptance

`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm audit` and a basePath-aware static output inspection are run. The report distinguishes resolved compatible audit fixes from residual advisories and clearly marks Git/PR/Pages status if the environment blocks repository writes or deployment access.
