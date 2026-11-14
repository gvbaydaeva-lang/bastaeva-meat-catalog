# SEO и технический аудит — 14 ноября 2026

## Выполнено

- Добавлены уникальные русскоязычные title/description для главной, каталога, категорий, подкатегорий, подборок, контактов и информационных страниц.
- Добавлены canonical, Open Graph, Twitter metadata и единый шаблон заголовков.
- Технический `github.io`-вариант закрыт через `noindex, nofollow` и `robots.txt: Disallow: /`. Sitemap в этом режиме пустой.
- Добавлены `app/robots.ts` и `app/sitemap.ts`. В sitemap попадают только публичные маршруты и подтверждённые товары/рецепты; `__empty__`, `pending` и несуществующие товары исключены.
- Добавлены JSON-LD `LocalBusiness` и `BreadcrumbList`. `Product`/`Recipe` строятся только для полных подтверждённых записей; текущие пустые `products` и `recipes` не создают такую разметку.
- Подготовлена опциональная Яндекс Метрика. Скрипт не выводится без `NEXT_PUBLIC_YANDEX_METRIKA_ID` и `NEXT_PUBLIC_YANDEX_METRIKA_ENABLED=true`; фиктивный счётчик не используется. События: `phone_click`, `messenger_click`, `route_click`, `product_view`, `product_inquiry`.
- Сохранены текущий дизайн, маршруты, пустые состояния, отсутствие ассортимента и отсутствие фотографий. Карта уже имела `loading="lazy"`; изображения Next.js используют `sizes`, а галерея загружает только первый кадр приоритетно.

## Проверки

- `npm test` — 45 тестов, 7 файлов, 0 ошибок.
- `npm run typecheck` — успешно.
- `npm run lint` — 0 warnings, 0 errors.
- `npm run build` — успешно, 53 статические страницы.
- `GITHUB_ACTIONS=true npm run build` — успешно; basePath `/bastaeva-meat-catalog` присутствует в ассетах и внутренних ссылках.
- Static output: технические страницы содержат `noindex, nofollow`; `out/sitemap.xml` пуст при пустом каталоге.

## npm audit

`npm audit --json` вернул 17 предупреждений: 3 critical, 5 high и 9 moderate.

- Цепочка `next@14.2.35` содержит актуальные advisory для Next.js и вложенного PostCSS; audit сообщает `fixAvailable: false` для прямой зависимости.
- `eslint-config-next` и его вложенные glob/minimatch/@typescript-eslint отмечены в основном как dev-зависимости; безопасного автоматического исправления без смены совместимого стека не найдено.
- `vitest@2.1.9` связан с advisory для Vite, `@vitest/mocker` и tinypool. Audit предлагает изменения, которые требуют перехода на более новую major-ветку тестового стека; это не применялось без отдельной проверки совместимости.
- `npm audit fix --force` не запускался. Dry-run через стандартный npm cache был заблокирован правами на root-owned cache; повторная попытка с отдельным временным cache зависла без результата и была остановлена. Lockfile и package.json не изменены.

## Что нужно для индексации и Метрики

Перед включением индексации задать `NEXT_PUBLIC_SITE_URL` на основной домен и `NEXT_PUBLIC_ENABLE_INDEXING=true`, проверить домен и sitemap. Для Метрики дополнительно задать реальный `NEXT_PUBLIC_YANDEX_METRIKA_ID`, включить `NEXT_PUBLIC_YANDEX_METRIKA_ENABLED=true` и показать пользователю требуемое уведомление/согласие до загрузки счётчика согласно действующим правилам проекта.

## Ограничения текущего результата

Git не разрешил запись в `.git` (`Operation not permitted`), поэтому ветка, commit, PR, merge и push в этом окружении не созданы. Публикация GitHub Pages также не выполнялась; production URL не проверялся.
