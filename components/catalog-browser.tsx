"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, subcategories } from "@/lib/data";
import { DEFAULT_CATALOG_FILTERS, filterAndSortProducts, getAvailableSubcategories, meatTypeOptions, type CatalogFilters } from "@/lib/catalog-filters";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

const purposeOptions = [["soup", "Для супа"], ["frying", "Для жарки"], ["stewing", "Для тушения"], ["grill", "Для гриля"], ["quick-dinner", "Быстрый ужин"], ["national-dishes", "Национальные блюда"]] as const;
const availabilityOptions = [["all", "Любой статус"], ["in-stock", "В наличии"], ["out-of-stock", "Нет в наличии"], ["unknown", "Наличие уточняется"]] as const;
const sortOptions = [["name-asc", "Название: А–Я"], ["name-desc", "Название: Я–А"], ["price-asc", "Цена: сначала ниже"], ["price-desc", "Цена: сначала выше"], ["popular", "Популярные"], ["new", "Новинки"]] as const;

function SelectField({ label, value, onChange, children, disabled = false }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode; disabled?: boolean }) {
  const id = `catalog-${label.toLowerCase().replaceAll(" ", "-")}`;
  return <label className="block text-sm font-bold text-ink/70" htmlFor={id}>{label}<select id={id} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-sm font-normal disabled:cursor-not-allowed disabled:opacity-60">{children}</select></label>;
}

function activeFilterLabels(filters: CatalogFilters) {
  const labels: string[] = [];
  if (filters.query) labels.push(`Поиск: ${filters.query}`);
  if (filters.categorySlug) labels.push(categories.find((item) => item.slug === filters.categorySlug)?.name ?? filters.categorySlug);
  if (filters.subcategorySlug) labels.push(subcategories.find((item) => item.slug === filters.subcategorySlug)?.name ?? filters.subcategorySlug);
  if (filters.meatType) labels.push(meatTypeOptions.find(([, value]) => value === filters.meatType)?.[0] ?? filters.meatType);
  if (filters.purpose) labels.push(purposeOptions.find(([value]) => value === filters.purpose)?.[1] ?? filters.purpose);
  if (filters.availability !== "all") labels.push(availabilityOptions.find(([value]) => value === filters.availability)?.[1] ?? filters.availability);
  if (filters.minPrice) labels.push(`от ${filters.minPrice} ₽`);
  if (filters.maxPrice) labels.push(`до ${filters.maxPrice} ₽`);
  return labels;
}

export function CatalogBrowser({ products, initialCategorySlug = "", initialSubcategorySlug = "" }: { products: Product[]; initialCategorySlug?: string; initialSubcategorySlug?: string }) {
  const [filters, setFilters] = useState<CatalogFilters>({ ...DEFAULT_CATALOG_FILTERS, categorySlug: initialCategorySlug, subcategorySlug: initialSubcategorySlug });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filtered = useMemo(() => filterAndSortProducts(products, filters), [products, filters]);
  const activeLabels = activeFilterLabels(filters);
  const availableSubcategories = getAvailableSubcategories(filters.categorySlug);

  useEffect(() => setFilters((current) => ({ ...current, categorySlug: initialCategorySlug, subcategorySlug: initialSubcategorySlug })), [initialCategorySlug, initialSubcategorySlug]);
  useEffect(() => {
    if (filters.subcategorySlug && !availableSubcategories.includes(filters.subcategorySlug)) setFilters((current) => ({ ...current, subcategorySlug: "" }));
  }, [availableSubcategories, filters.subcategorySlug]);

  const update = <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => setFilters((current) => ({ ...current, [key]: value }));
  const reset = () => setFilters(DEFAULT_CATALOG_FILTERS);

  return <div>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="sr-only" htmlFor="catalog-search">Поиск по каталогу</label>
      <input id="catalog-search" value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder="Поиск по каталогу" className="focus-ring w-full rounded-full border border-line bg-white px-5 py-3 text-sm sm:max-w-sm" />
      <div className="flex items-center justify-between gap-3 text-sm text-ink/60"><span>{filtered.length} {filtered.length === 1 ? "товар" : "товаров"}</span><button type="button" className="button-secondary min-h-10 px-4 py-2 lg:hidden" aria-expanded={mobileFiltersOpen} aria-controls="catalog-filters" onClick={() => setMobileFiltersOpen((open) => !open)}>Фильтры</button></div>
    </div>
    <div className={`${mobileFiltersOpen ? "block" : "hidden"} mb-7 rounded-2xl border border-line bg-white p-5 lg:block`} id="catalog-filters">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField label="Категория" value={filters.categorySlug} onChange={(value) => { update("categorySlug", value); update("subcategorySlug", ""); }}><option value="">Все категории</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</SelectField>
        <SelectField label="Подкатегория" value={filters.subcategorySlug} disabled={!availableSubcategories.length} onChange={(value) => update("subcategorySlug", value)}><option value="">Все подкатегории</option>{subcategories.filter((item) => availableSubcategories.includes(item.slug)).map((subcategory) => <option key={subcategory.slug} value={subcategory.slug}>{subcategory.name}</option>)}</SelectField>
        <SelectField label="Вид мяса" value={filters.meatType} onChange={(value) => update("meatType", value)}><option value="">Любой вид</option>{meatTypeOptions.map(([label, value]) => <option key={value} value={value}>{label}</option>)}</SelectField>
        <SelectField label="Назначение" value={filters.purpose} onChange={(value) => update("purpose", value)}><option value="">Любое блюдо</option>{purposeOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</SelectField>
        <SelectField label="Наличие" value={filters.availability} onChange={(value) => update("availability", value as CatalogFilters["availability"])}>{availabilityOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</SelectField>
        <label className="block text-sm font-bold text-ink/70" htmlFor="catalog-min-price">Цена, от<input id="catalog-min-price" inputMode="decimal" type="number" min="0" value={filters.minPrice} onChange={(event) => update("minPrice", event.target.value)} placeholder="Не указана" className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-sm font-normal" /></label>
        <label className="block text-sm font-bold text-ink/70" htmlFor="catalog-max-price">Цена, до<input id="catalog-max-price" inputMode="decimal" type="number" min="0" value={filters.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} placeholder="Не указана" className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-sm font-normal" /></label>
        <SelectField label="Сортировка" value={filters.sort} onChange={(value) => update("sort", value as CatalogFilters["sort"])}>{sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</SelectField>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4"><span className="text-xs font-bold uppercase tracking-wide text-ink/50">Активные фильтры:</span>{activeLabels.length ? activeLabels.map((label) => <span key={label} className="rounded-full bg-[#F2E9DF] px-3 py-1 text-xs text-ink/70">{label}</span>) : <span className="text-sm text-ink/50">нет</span>}<button type="button" onClick={reset} className="focus-ring ml-auto text-sm font-bold text-terracotta disabled:cursor-not-allowed disabled:opacity-40" disabled={!activeLabels.length}>Сбросить фильтры</button></div>
    </div>
    {filtered.length ? <div className="grid gap-5 md:grid-cols-2">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60">{products.length ? "Ничего не найдено. Измените запрос или сбросьте фильтры." : "Ассортимент пока не опубликован. Товары появятся после подтверждения данных."}</div>}
  </div>;
}
