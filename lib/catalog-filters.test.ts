import { describe, expect, it } from "vitest";
import type { Product } from "./types";
import {
  DEFAULT_CATALOG_FILTERS,
  filterAndSortProducts,
  getAvailableSubcategories,
  getCollectionProductSlugs,
  type CatalogFilters
} from "./catalog-filters";

const fixtures: Product[] = [
  {
    slug: "lamb-soup",
    name: "Баранина для супа",
    categorySlug: "meat",
    subcategorySlug: "meat-merino-lamb",
    description: "Насыщенный бульон для шурпы",
    price: 850,
    saleUnit: "kg",
    composition: null,
    characteristics: ["мягкое мясо", "для шурпы"],
    photos: [],
    availability: "in-stock",
    imageLabel: "",
    purpose: ["soup", "stewing"],
    tags: ["popular"]
  },
  {
    slug: "veal-grill",
    name: "Телятина для гриля",
    categorySlug: "meat",
    subcategorySlug: "meat-steppe-veal",
    description: "Порционные куски",
    price: 1200,
    saleUnit: "kg",
    composition: null,
    characteristics: ["для гриля"],
    photos: [],
    availability: "out-of-stock",
    imageLabel: "",
    purpose: ["grill", "frying"],
    tags: ["new"]
  },
  {
    slug: "dumplings",
    name: "Домашние манты",
    categorySlug: "homemade-semi-finished",
    subcategorySlug: "semi-manti",
    description: "Замороженный полуфабрикат",
    price: null,
    saleUnit: "package",
    composition: "Уточняется",
    characteristics: ["быстрый ужин"],
    photos: [],
    availability: "unknown",
    imageLabel: "",
    purpose: ["quick-dinner"],
    tags: []
  }
];

const filter = (overrides: Partial<CatalogFilters> = {}): CatalogFilters => ({
  ...DEFAULT_CATALOG_FILTERS,
  ...overrides
});

describe("catalog filtering", () => {
  it("searches Russian text across product metadata without case sensitivity", () => {
    expect(filterAndSortProducts(fixtures, filter({ query: "ШУРПА" })).map((item) => item.slug)).toEqual(["lamb-soup"]);
    expect(filterAndSortProducts(fixtures, filter({ query: "полуфабрикат" })).map((item) => item.slug)).toEqual(["dumplings"]);
  });

  it("applies category, purpose, availability and price filters together", () => {
    expect(filterAndSortProducts(fixtures, filter({
      categorySlug: "meat",
      purpose: "grill",
      availability: "out-of-stock",
      minPrice: "1000",
      maxPrice: "1300"
    })).map((item) => item.slug)).toEqual(["veal-grill"]);
  });

  it("filters by a meat type keyword", () => {
    expect(filterAndSortProducts(fixtures, filter({ meatType: "теля" })).map((item) => item.slug)).toEqual(["veal-grill"]);
  });

  it("does not treat a missing price as zero", () => {
    expect(filterAndSortProducts(fixtures, filter({ maxPrice: "100" }))).toEqual([]);
    expect(filterAndSortProducts(fixtures, filter({ sort: "price-asc" })).map((item) => item.slug)).toEqual(["lamb-soup", "veal-grill", "dumplings"]);
  });

  it("supports name, price, popular and new sorting", () => {
    expect(filterAndSortProducts(fixtures, filter({ sort: "name-asc" })).map((item) => item.slug)).toEqual(["lamb-soup", "dumplings", "veal-grill"]);
    expect(filterAndSortProducts(fixtures, filter({ sort: "name-desc" })).map((item) => item.slug)).toEqual(["veal-grill", "dumplings", "lamb-soup"]);
    expect(filterAndSortProducts(fixtures, filter({ sort: "price-desc" })).map((item) => item.slug)).toEqual(["veal-grill", "lamb-soup", "dumplings"]);
    expect(filterAndSortProducts(fixtures, filter({ sort: "popular" })).map((item) => item.slug)).toEqual(["lamb-soup", "dumplings", "veal-grill"]);
    expect(filterAndSortProducts(fixtures, filter({ sort: "new" })).map((item) => item.slug)).toEqual(["veal-grill", "lamb-soup", "dumplings"]);
  });

  it("limits subcategory options to the selected category", () => {
    expect(getAvailableSubcategories("meat")).toEqual(["meat-merino-lamb", "meat-steppe-veal", "meat-young-pork"]);
  });

  it("deduplicates products when forming collection references", () => {
    expect(getCollectionProductSlugs(fixtures, ["soup", "stewing", "soup"])).toEqual(["lamb-soup"]);
    expect(getCollectionProductSlugs(fixtures, ["quick-dinner"])).toEqual(["dumplings"]);
  });
});
