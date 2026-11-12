# ИП Бастаева А.Д. Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a working multi-page Next.js catalog skeleton with typed data, shared UI, and safe empty states.

**Architecture:** App Router pages consume typed records from `lib/data.ts`; reusable UI lives in `components/`; future Supabase access can replace the data module without changing route contracts.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-compatible utilities, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-12-bastaeva-catalog-design.md`

## Global Constraints

- Do not invent prices, compositions, factual characteristics, stock, contacts, or photos.
- Do not implement cart, online payment, external integrations, or public admin UI.
- Keep catalog data separate from page components.
- Use shared layout/navigation and responsive mobile-first UI.

## Tasks

- [x] Scaffold Next.js, TypeScript, Tailwind, Vitest, README, and project rules.
- [x] Add typed domain models and safe placeholder data for six catalog categories and recipes.
- [x] Add shared shell, cards, breadcrumbs, contact buttons, search/filter, and mobile navigation.
- [x] Add all public routes, dynamic category/product routes, and reserved `/admin` route.
- [x] Add focused data-model tests and run typecheck, lint, test, build, and route smoke checks.
