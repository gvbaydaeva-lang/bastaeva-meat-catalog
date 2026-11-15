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

- В локальном production-источнике подготовлены 25 позиций с однозначно прочитанными названием, ценой и единицей продажи.
- Для 24 позиций используются нейтральные placeholder-блоки; подтверждённое фото привязано только к куриным котлетам.
- Ещё 22 спорные записи сохранены отдельно в `data/catalog-products-pending.json` и не получают товарных маршрутов до согласования.
- Наличие всех подготовленных позиций отображается как «Уточняется»; составы, характеристики и наличие не выдумываются.
- Основные URL: `/catalog`, `/catalog/[category]`, `/catalog/[category]/[subcategory]`, `/catalog/[category]/[subcategory]/[product]`.
- Тематические подборки находятся на `/collections` и `/collections/[collection]`; они ссылаются на товары и не дублируют их.
- Корзина, онлайн-оплата, Supabase, внешние интеграции и административная панель исключены из проекта.

## Архитектура данных

Структурированные данные находятся в `data/catalog-products.json`, спорные записи — в `data/catalog-products-pending.json`, модели — в `lib/types.ts`, валидатор — в `lib/catalog-import.ts`, маршрутные параметры — в `lib/catalog-routes.ts`. Товар хранится один раз и связан с основной категорией и подкатегорией; подборки содержат только `productSlugs`. Подготовленный список доступен только в локальном preview до коммерческого согласования публикации; push, merge и GitHub Pages для этого этапа не выполняются.

Перед добавлением реальных данных используйте `npm run catalog:validate -- путь/к/файлу.json` или CSV. Полная инструкция по передаче ассортимента и фотографий находится в `docs/catalog-import.md`.
