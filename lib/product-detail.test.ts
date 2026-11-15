import { describe, expect, it } from "vitest";
import type { Product } from "./types";
import {
  formatProductPrice,
  getProductAvailabilityLabel,
  getProductInquiryMessage,
  getProductInquiryUrl,
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

  it("formats confirmed price ranges without collapsing them to one price", () => {
    expect(formatProductPrice(fixtureProduct({
      price: 780,
      saleUnit: "kg",
      priceOptions: [
        { label: "От", price: 780, saleUnit: "kg" },
        { label: "До", price: 850, saleUnit: "kg" }
      ]
    }))).toBe("780–850 ₽ / кг");
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

  it("builds a channel URL without claiming that a message was sent", () => {
    expect(getProductInquiryUrl("https://t.me/example", "Домашние котлеты")).toContain(
      "?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5"
    );
    expect(getProductInquiryUrl("https://t.me/example", "Домашние котлеты")).toContain("%D0%94%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%BE%D1%82%D0%BB%D0%B5%D1%82%D1%8B%3F");
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
