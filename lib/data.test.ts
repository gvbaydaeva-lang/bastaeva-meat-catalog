import { describe, expect, it } from "vitest";
import {
  categories,
  collections,
  getCollection,
  getProductsByCollection,
  getProductsBySubcategory,
  isProductReferenceValid,
  subcategories,
  products,
  recipes,
  contactChannels,
  getActiveContactChannels,
  getYandexRouteUrl,
  storeContact
} from "./data";

describe("catalog seed data", () => {
  it("keeps verified store contact routing in one source", () => {
    expect(storeContact).toMatchObject({
      address: "Республика Калмыкия, г. Элиста, 8 микрорайон, бульвар Бембеева, 8",
      phone: "+7 927 590-55-88",
      phoneHref: "tel:+79275905588",
      coordinates: { latitude: 46.304724, longitude: 44.312429 }
    });
    expect(storeContact.routeHref).toBe(getYandexRouteUrl(storeContact.address));
  });

  it("does not activate unconfirmed messenger channels", () => {
    expect(contactChannels.map(({ id, href }) => ({ id, href }))).toEqual([
      { id: "telegram", href: null },
      { id: "whatsapp", href: null },
      { id: "viber", href: null },
      { id: "vk", href: null }
    ]);
    expect(getActiveContactChannels()).toEqual([]);
  });

  it("contains the six ТЗ categories with unique slugs", () => {
    expect(categories).toHaveLength(6);
    expect(new Set(categories.map((category) => category.slug)).size).toBe(6);
    expect(categories.map((category) => category.name)).toEqual([
      "Мясо",
      "Фарш",
      "Домашняя птица",
      "Субпродукты и суповые наборы",
      "Домашние полуфабрикаты",
      "Национальная продукция"
    ]);
    expect(categories.map((category) => category.slug)).not.toContain("sausages");
  });

  it("contains only the 25 publication candidates from the approved source split", () => {
    expect(products).toHaveLength(25);
    expect(products.map((product) => product.slug)).not.toContain("beriki-veal-pork-pending");
    expect(products.map((product) => product.slug)).not.toContain("horse-meat-kazy");
    expect(products.find((product) => product.slug === "chicken-cutlets")?.photos).toEqual([
      "/images/products/homemade-semi-finished/semi-cutlets/chicken-cutlets.jpg"
    ]);
    expect(products.filter((product) => product.photos.length === 0)).toHaveLength(24);
  });

  it("defines subcategories for every main category", () => {
    expect(subcategories.length).toBeGreaterThanOrEqual(19);
    expect(categories.every((category) => subcategories.some((item) => item.categorySlug === category.slug))).toBe(true);
    expect(new Set(subcategories.map((item) => item.slug)).size).toBe(subcategories.length);
    expect(subcategories.filter((item) => item.categorySlug === "minced-meat").map((item) => item.name)).toEqual([
      "Смешанный фарш", "Говяжий фарш", "Свиной фарш", "Фарш из индейки", "Куриный фарш"
    ]);
    expect(categories.every((category) => category.subcategorySlugs.slice().sort().join(",") === subcategories.filter((item) => item.categorySlug === category.slug).map((item) => item.slug).sort().join(","))).toBe(true);
  });

  it("keeps future product references and collection references normalized", () => {
    expect(products.every((product) => categories.some((category) => category.slug === product.categorySlug))).toBe(true);
    expect(products.every((product) => subcategories.some((item) => item.slug === product.subcategorySlug))).toBe(true);
    expect(products.every((product) => subcategories.find((item) => item.slug === product.subcategorySlug)?.categorySlug === product.categorySlug)).toBe(true);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
    expect(collections.map((collection) => collection.slug)).toEqual([
      "soup", "frying", "stewing", "grill", "quick-dinner", "national-dishes"
    ]);
    expect(collections.every((collection) => new Set(collection.productSlugs).size === collection.productSlugs.length)).toBe(true);
    expect(collections.every((collection) => collection.productSlugs.every((slug) => products.some((product) => product.slug === slug)))).toBe(true);
    expect(getProductsByCollection("soup")).toEqual([]);
    expect(getProductsBySubcategory("meat-merino-lamb").map((product) => product.slug)).toEqual(["merino-lamb"]);
    expect(getCollection("missing")).toBeUndefined();
    expect(isProductReferenceValid({
      slug: "invalid-reference",
      name: "",
      categorySlug: "meat",
      subcategorySlug: "semi-manti",
      description: "",
      price: null,
      saleUnit: null,
      composition: null,
      characteristics: [],
      photos: [],
      availability: "unknown",
      imageLabel: "",
      purpose: [],
      tags: []
    })).toBe(false);
  });

  it("keeps recipes separate from products", () => {
    expect(recipes).toEqual([]);
    expect(recipes.every((recipe) => !("price" in recipe))).toBe(true);
  });
});
