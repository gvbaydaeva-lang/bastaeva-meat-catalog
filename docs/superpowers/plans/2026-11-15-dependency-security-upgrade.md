# Dependency Security Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Обновить зависимости статического каталога до поддерживаемых исправленных версий и подтвердить, что сайт, GitHub Pages build и публичный release chain не изменили поведение.

**Architecture:** Сохраняем Next.js App Router с `output: "export"`, пустые `products`/`productSlugs`, текущий `basePath` только для GitHub Actions и существующий workflow. Обновляем только package manifests/lockfile и необходимую lint-конфигурацию; UI, данные и маршруты не трогаем.

**Tech Stack:** Next.js, React, TypeScript, ESLint/eslint-config-next, Vitest, Tailwind CSS, npm lockfile v3, GitHub Pages Actions.

**Spec:** `docs/superpowers/specs/2026-11-15-dependency-security-upgrade-design.md`

## Global Constraints

- Не менять дизайн, структуру каталога, ассортимент, контакты или фотографии.
- Не использовать `npm audit fix --force`.
- Сохранить статический export, `trailingSlash`, GitHub Pages `basePath` и существующий workflow.
- Перед публикацией выполнить `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `git diff --check` и повторный `npm audit`.
- Production audit и полный audit считать отдельно; dev-only advisory не выдавать за риск опубликованного Pages runtime.

## Review Focus

- Next major upgrade must not remove static export or alter generated base-path links; test exported HTML/assets under `GITHUB_ACTIONS=true`.
- React/Next peer compatibility must be exact in the lockfile; typecheck and production build must pass from a clean install.
- Replacing `next lint` must preserve the project's ESLint rules and fail on real errors; run the exact workflow lint command locally.
- Empty catalog and noindex policy must remain unchanged; inspect `robots.txt`, `sitemap.xml`, and absence of product records.
- Static Pages must not accidentally reintroduce server-only APIs or runtime image optimization; inspect generated output and run route smoke checks.

### Task 1: Baseline and dependency graph decision

**Files:** Read: `package.json`, `package-lock.json`, `.eslintrc.json`, `next.config.mjs`, `.github/workflows/deploy-pages.yml`

- [ ] Record current full and production-only `npm audit`, direct package versions, npm registry current versions, and current test/build baseline.
- [ ] Select the smallest supported Next/React/Vitest/ESLint set that removes applicable advisories without crossing an unnecessary migration boundary.
- [ ] Stop with a written reason if peer constraints or build behavior make the safe migration impossible.

### Task 2: Upgrade manifests and lockfile

**Files:** Modify: `package.json`, `package-lock.json`, `eslint.config.mjs`; delete obsolete `.eslintrc.json` if required.

- [ ] Update direct versions explicitly; keep production dependencies and devDependencies correctly classified.
- [ ] Replace `next lint` with the supported ESLint invocation, preserving `next/core-web-vitals` rules.
- [ ] Verify `npm ci` succeeds from the resulting lockfile with a writable task-specific cache.
- [ ] Run `npm audit`, `npm audit --omit=dev`, and `npm ls --depth=0`; record advisory counts and remaining paths.

### Task 3: Regression verification

**Files:** Read: `app/`, `components/`, `lib/`, `data/catalog-products.json`, `out/`

- [ ] Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and `git diff --check`.
- [ ] Run the build with `GITHUB_ACTIONS=true` and verify generated base paths, robots/sitemap and no product records.
- [ ] Start a local static server and smoke-test home, catalog/category/subcategory/product empty states, collections, contacts/map, information pages, search/filter/sort UI where present, and mobile viewport behavior.

### Task 4: Review and release

**Files:** Read: final diff and `.github/workflows/deploy-pages.yml`

- [ ] Request independent code review of the feature diff.
- [ ] Commit only dependency/config/spec/plan files, push `codex/dependency-security-upgrade`, and create a PR against `main`.
- [ ] Wait for PR checks and merge only after they pass.
- [ ] Confirm the existing Pages workflow deploys `main`, then verify public URLs and mobile layout; report any remaining advisories with exact scope.
