import { categories, subcategories } from "./data";
import type { Product } from "./types";

export type CatalogSort = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "popular" | "new";
export type CatalogAvailability = "all" | "in-stock" | "out-of-stock" | "unknown";

export type CatalogFilters = {
  query: string;
  categorySlug: string;
  subcategorySlug: string;
  meatType: string;
  purpose: string;
  availability: CatalogAvailability;
  minPrice: string;
  maxPrice: string;
  sort: CatalogSort;
};

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  query: "",
  categorySlug: "",
  subcategorySlug: "",
  meatType: "",
  purpose: "",
  availability: "all",
  minPrice: "",
  maxPrice: "",
  sort: "name-asc"
};

export const meatTypeOptions = [
  ["Баранина", "баран"], ["Телятина", "теля"], ["Свинина", "свин"],
  ["Говядина", "говяд"], ["Курица", "кур"], ["Индейка", "инд"],
  ["Утка", "утк"], ["Гусь", "гус"], ["Птица", "птиц"]
] as const;

const collectionPurposes: Record<string, string> = {
  soup: "soup",
  frying: "frying",
  stewing: "stewing",
  grill: "grill",
  "quick-dinner": "quick-dinner",
  "national-dishes": "national-dishes"
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("ru-RU");
}

function numericFilter(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function matchesQuery(searchable: string, query: string) {
  return query.split(/\s+/).every((queryToken) => {
    const token = normalize(queryToken);
    if (searchable.includes(token)) return true;
    const prefix = token.slice(0, Math.max(4, token.length - 1));
    return searchable.split(/\s+/).some((word) => word.startsWith(prefix));
  });
}

function compareNames(left: Product, right: Product) {
  return left.name.localeCompare(right.name, "ru-RU", { sensitivity: "base" });
}

export function filterAndSortProducts(products: Product[], filters: CatalogFilters) {
  const query = normalize(filters.query);
  const minPrice = numericFilter(filters.minPrice);
  const maxPrice = numericFilter(filters.maxPrice);

  const filtered = products.filter((product) => {
    const category = categories.find((item) => item.slug === product.categorySlug);
    const subcategory = subcategories.find((item) => item.slug === product.subcategorySlug);
    const searchable = [
      product.name,
      category?.name ?? "",
      subcategory?.name ?? "",
      product.description,
      product.composition ?? "",
      ...product.characteristics,
      ...product.purpose,
      ...product.tags
    ].map(normalize).join(" ");

    if (query && !matchesQuery(searchable, query)) return false;
    if (filters.categorySlug && product.categorySlug !== filters.categorySlug) return false;
    if (filters.subcategorySlug && product.subcategorySlug !== filters.subcategorySlug) return false;
    if (filters.meatType && !searchable.includes(normalize(filters.meatType))) return false;
    if (filters.purpose && !product.purpose.includes(filters.purpose)) return false;
    if (filters.availability !== "all" && product.availability !== filters.availability) return false;
    if (minPrice !== null && (product.price === null || product.price < minPrice)) return false;
    if (maxPrice !== null && (product.price === null || product.price > maxPrice)) return false;
    return true;
  });

  return filtered.toSorted((left, right) => {
    if (filters.sort === "name-asc") return compareNames(left, right);
    if (filters.sort === "name-desc") return compareNames(right, left);
    if (filters.sort === "popular" || filters.sort === "new") {
      const tag = filters.sort;
      const tagDifference = Number(right.tags.includes(tag)) - Number(left.tags.includes(tag));
      return tagDifference || compareNames(left, right);
    }
    if (left.price === null && right.price === null) return compareNames(left, right);
    if (left.price === null) return 1;
    if (right.price === null) return -1;
    return filters.sort === "price-asc" ? left.price - right.price : right.price - left.price;
  });
}

export function getAvailableSubcategories(categorySlug: string) {
  return subcategories.filter((item) => !categorySlug || item.categorySlug === categorySlug).map((item) => item.slug);
}

export function getCollectionProductSlugs(products: Product[], collectionSlugs: string[]) {
  const selectedPurposes = new Set(collectionSlugs.map((slug) => collectionPurposes[slug]).filter(Boolean));
  return products.filter((product) => product.purpose.some((purpose) => selectedPurposes.has(purpose))).map((product) => product.slug);
}
