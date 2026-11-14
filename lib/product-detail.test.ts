import { describe, expect, it } from "vitest";
import type { Product } from "./types";
import {
  formatProductPrice,
  getProductAvailabilityLabel,
  getProductInquiryMessage,
  getSimilarProducts
} from "./product-detail";

const fixtureProduct = (overrides: Partial<Product> = {}): Product => ({
  slug: "cutlets",
  name: "Домашние котлеты",
  categorySlug: "homemade-semi-finished",
  subcategorySlug: "semi-cutlets",
  description: "Фикстура для тестов, не публикуется.",
  price: 780,
  saleUnit: "kg",
  composition: "Фикстура для тестов",
  characteristics: ["Фикстура"],
  photos: ["/test/cutlets.jpg"],
  availability: "in-stock",
  imageLabel: "Тестовое фото",
  purpose: ["frying"],
  tags: ["recommended"],
  ...overrides
});

describe("product detail helpers", () => {
  it("uses a safe text fallback for missing and zero prices", () => {
    expect(formatProductPrice(fixtureProduct({ price: null }))).toBe("Цену уточняйте");
    expect(formatProductPrice(fixtureProduct({ price: 0 }))).toBe("Цену уточняйте");
    expect(formatProductPrice(fixtureProduct({ price: 780, saleUnit: "kg" }))).toBe("780 ₽ / кг");
  });

  it("returns human-readable availability labels", () => {
    expect(getProductAvailabilityLabel("in-stock")).toBe("В наличии");
    expect(getProductAvailabilityLabel("out-of-stock")).toBe("Нет в наличии");
    expect(getProductAvailabilityLabel("unknown")).toBe("Наличие уточняется");
  });

  it("builds the exact inquiry message", () => {
    expect(getProductInquiryMessage("Домашние котлеты")).toBe(
      "Здравствуйте! Подскажите, пожалуйста, есть ли в наличии Домашние котлеты?"
    );
  });

  it("prefers products from the same subcategory and excludes the current product", () => {
    const current = fixtureProduct();
    const similar = fixtureProduct({ slug: "manti", name: "Манты" });
    const sameCategory = fixtureProduct({ slug: "beriki", name: "Берики", subcategorySlug: "semi-beriki" });
    const otherCategory = fixtureProduct({ slug: "liver", name: "Печень", categorySlug: "offal-soup-sets", subcategorySlug: "offal-liver" });

    expect(getSimilarProducts(current, [current, otherCategory, sameCategory, similar])).toEqual([similar, sameCategory]);
  });

  it("falls back to same-category products and returns no empty placeholders", () => {
    const current = fixtureProduct();
    const sameCategory = fixtureProduct({ slug: "beriki", name: "Берики", subcategorySlug: "semi-beriki" });
    const otherCategory = fixtureProduct({ slug: "liver", name: "Печень", categorySlug: "offal-soup-sets", subcategorySlug: "offal-liver" });

    expect(getSimilarProducts(current, [current, sameCategory, otherCategory])).toEqual([sameCategory]);
    expect(getSimilarProducts(current, [current, otherCategory])).toEqual([]);
  });
});
