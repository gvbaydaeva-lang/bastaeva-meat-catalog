# ИП Бастаева А.Д. — сайт-каталог

Многостраничный сайт-каталог мясного магазина на Next.js App Router, TypeScript и Tailwind CSS.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Публикация

После push в `main` GitHub Actions собирает статическую версию и публикует её на GitHub Pages:

[https://gvbaydaeva-lang.github.io/bastaeva-meat-catalog/](https://gvbaydaeva-lang.github.io/bastaeva-meat-catalog/)

Настройки публикации находятся в `.github/workflows/deploy-pages.yml`. Для локального запуска базовый путь не используется; он добавляется только в сборке GitHub Actions.

## Проверки

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Границы текущего этапа

- Каталог и страницы используют нейтральные placeholder-блоки вместо реальных фотографий.
- Реальный ассортимент, цены, составы, характеристики, фотографии и наличие намеренно не заполнены: они будут добавлены через Codex после передачи подтверждённых материалов.
- Основные URL: `/catalog`, `/catalog/[category]`, `/catalog/[category]/[subcategory]`, `/catalog/[category]/[subcategory]/[product]`.
- Тематические подборки находятся на `/collections` и `/collections/[collection]`; они ссылаются на товары и не дублируют их.
- Корзина, онлайн-оплата, Supabase, внешние интеграции и административная панель исключены из проекта.

## Архитектура данных

Структурированные данные находятся в `data/catalog-products.json`, модели — в `lib/types.ts`, валидатор — в `lib/catalog-import.ts`, маршрутные параметры — в `lib/catalog-routes.ts`. Товар хранится один раз и связан с основной категорией и подкатегорией; подборки содержат только `productSlugs`. До подтверждения ассортимента production-список товаров пуст, а страницы показывают понятные пустые состояния.

Перед добавлением реальных данных используйте `npm run catalog:validate -- путь/к/файлу.json` или CSV. Полная инструкция по передаче ассортимента и фотографий находится в `docs/catalog-import.md`.
