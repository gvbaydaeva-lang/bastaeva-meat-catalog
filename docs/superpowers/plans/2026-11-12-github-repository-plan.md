# GitHub Repository Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Сохранить исходный проект ИП Бастаева А.Д. в публичном GitHub-репозитории и настроить безопасный `push` в `main`.

**Architecture:** Репозиторий создаётся из текущей папки проекта; исходники и проектные документы сохраняются, а локальные зависимости, сборки и секреты исключаются через `.gitignore`. Автоматическая публикация сайта, корзина, оплата и админка не входят в этот шаг.

**Tech Stack:** Git, GitHub CLI, Next.js, TypeScript, npm.

**Spec:** `AGENTS.md` и пользовательское поручение от 2026-11-12.

## Global Constraints

- Не добавлять цены, составы, характеристики, остатки, адреса, контакты или фотографии без подтверждённого источника.
- Перед публикацией проверить `npm run typecheck`, `npm run lint`, `npm test` и `npm run build`.
- Не публиковать `.next`, `node_modules`, локальные секреты и временные файлы.
- Не включать автоматическую публикацию сайта без отдельного задания.

## Review Focus

- Секретные файлы и локальные переменные окружения не должны попасть в первый коммит — проверить список staged-файлов.
- Сборка и зависимости не должны попасть в репозиторий — проверить `.gitignore` и `git status`.
- Удалённый репозиторий должен соответствовать локальному HEAD — сверить `git ls-remote` с `git rev-parse HEAD`.
- Публичность репозитория не должна означать публикацию сайта — убедиться, что workflow Pages не создавался.

### Task 1: Prepare and verify repository contents

**Files:**
- Create: `.gitignore`
- Create: `docs/superpowers/plans/2026-11-12-github-repository-plan.md`

- [x] Add standard Next.js/Node ignores, local env ignores, and OS/editor temporary files.
- [x] Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
- [x] Review `git status --short` and ensure no secret-looking files are staged.

### Task 2: Initialize local Git and publish to GitHub

**Files:**
- Modify: Git metadata and remote configuration only.

- [x] Initialize Git with `main` as the default branch.
- [x] Create public GitHub repository `gvbaydaeva-lang/bastaeva-meat-catalog` without an extra README.
- [x] Commit the verified project and push `main` to `origin`.
- [x] Verify remote URL, remote HEAD, repository visibility, and absence of a Pages workflow.
