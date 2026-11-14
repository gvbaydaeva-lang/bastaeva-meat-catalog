# Catalog Import Preparation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a validated JSON/CSV product-import pipeline and photo folder convention without publishing real products.

**Architecture:** Keep `lib/data.ts` as the runtime catalog facade, but load its empty product list from a typed canonical JSON source. Add a pure TypeScript validator for catalog records and a Node-friendly CLI adapter that validates JSON or CSV against existing category/subcategory dictionaries and local photo paths. Keep production data empty and test fixtures separate.

**Tech Stack:** Next.js 14 App Router, TypeScript, Vitest, Node.js standard library, JSON, CSV.

**Spec:** `docs/superpowers/specs/2026-11-14-catalog-import-design.md`

## Global Constraints

- Do not add real products, prices, availability, composition, characteristics, or photos.
- Preserve existing routes, design, search, filters, SEO, and empty states.
- Keep products and product slugs empty until confirmed assortment is provided.
- Do not add admin, Supabase, cart, checkout, or public admin simulation.
- Use `public/images/products/<category>/<subcategory>/` for future real photos.
- Production checks are `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.

## Review Focus

- A duplicate product slug or name must fail before data reaches the runtime catalog; covered by validator duplicate tests.
- A category/subcategory mismatch must fail even when both slugs individually exist; covered by relationship validation tests.
- A zero, negative, fractional-invalid, or malformed price and an unsupported sale unit must fail; covered by price/unit tests.
- A referenced photo outside the product photo root or missing on disk must fail; covered by photo path tests.
- CSV quoting, commas, empty production input, and row-numbered errors must remain understandable; covered by CSV adapter tests.

### Task 1: Define import data contracts and empty production source

**Files:**
- Create: `data/catalog-products.json`
- Create: `data/README.md`
- Modify: `lib/types.ts`
- Modify: `lib/data.ts`
- Test: `lib/catalog-import.test.ts`

**Interfaces:**
- `PriceOption = { label: string; price: number; saleUnit: SaleUnit }`.
- `CatalogProductInput` contains required product fields and `priceOptions`.
- `Product` remains compatible with current components and gains optional `priceOptions` with `price` derived from its first option.
- `loadCatalogProducts(input, context)` returns `Product[]` or validation errors without mutating the source.

- [ ] Write failing tests for normalization of multiple price options, empty production source, and preservation of current `Product` fields.
- [ ] Run `npm test -- lib/catalog-import.test.ts` and confirm failure because the new importer/types do not exist.
- [ ] Implement types, empty JSON source, and runtime loading through the importer while retaining `products` as an empty array.
- [ ] Run the focused test and then the existing data/route/detail tests.

### Task 2: Implement pure catalog validation

**Files:**
- Create: `lib/catalog-import.ts`
- Modify: `lib/types.ts` if the shared input types need adjustment
- Test: `lib/catalog-import.test.ts`

**Interfaces:**
- `validateCatalogProducts(records: unknown[], context: CatalogValidationContext): CatalogValidationIssue[]`.
- `normalizeCatalogProducts(records: CatalogProductInput[]): Product[]`.
- Validation context includes known categories, subcategories, collections, and a photo-root existence callback.

- [ ] Add failing tests for required fields, duplicate slug/name, invalid category relationship, invalid price/unit, invalid availability, invalid photos, and duplicate photo paths.
- [ ] Run the focused tests and verify the failures describe missing validation behavior.
- [ ] Implement validation with stable error codes and record indexes; reject all invalid records before normalization.
- [ ] Run focused tests and confirm all validation cases pass.

### Task 3: Add JSON and CSV import CLI with isolated fixtures

**Files:**
- Create: `scripts/validate-catalog.mjs`
- Create: `tests/fixtures/catalog-valid.json`
- Create: `tests/fixtures/catalog-invalid.json`
- Create: `tests/fixtures/catalog-valid.csv`
- Create: `tests/fixtures/catalog-invalid.csv`
- Modify: `package.json`
- Test: `lib/catalog-import.test.ts`

**Interfaces:**
- CLI usage: `npm run catalog:validate -- <path-to-json-or-csv>`.
- JSON input is an array of product records; CSV uses documented headers and semicolon-separated list fields.
- Exit code `0` means valid input; exit code `1` prints row/product-specific issues and never writes `data/catalog-products.json`.

- [ ] Add tests that invoke the parser/validator boundary with valid JSON and CSV fixtures and assert invalid fixtures produce row-numbered issues.
- [ ] Run tests and confirm the new CLI boundary fails before implementation.
- [ ] Implement standard-library JSON/CSV parsing, header checks, list/number conversion, and delegation to the pure validator; add the npm script.
- [ ] Run the CLI against every fixture and confirm valid inputs exit `0`, invalid inputs exit `1`, and the production source remains unchanged.

### Task 4: Prepare photo folders and contributor documentation

**Files:**
- Create: `public/images/products/.gitkeep`
- Create: `docs/catalog-import.md`
- Modify: `README.md`

**Interfaces:**
- Document exact JSON and CSV fields, accepted units, price-option examples, photo path convention, image requirements, and first-category handoff checklist.
- Explain that images must be confirmed store photos and that placeholders/external URLs are rejected.

- [ ] Write documentation and folder placeholders without adding media or product records.
- [ ] Review paths and examples against the validator interface and current routes.

### Task 5: Full verification and publication preparation

**Files:**
- Modify only files found necessary by verification.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check` and confirm `data/catalog-products.json` is empty and no real media was added.
- [ ] Push the technical changes to `main` only after verification, allowing the existing GitHub Pages workflow to publish them.
- [ ] Verify the workflow/public URL and report any external verification as `UNVERIFIED` if it cannot be observed.
