import { describe, expect, it } from "vitest";
import { categories, products, recipes } from "./data";

describe("catalog seed data", () => {
  it("contains exactly six categories with unique slugs", () => {
    expect(categories).toHaveLength(6);
    expect(new Set(categories.map((category) => category.slug)).size).toBe(6);
  });

  it("keeps unverified commercial fields explicitly empty", () => {
    expect(products.every((product) => product.price === null)).toBe(true);
    expect(products.every((product) => product.availability === "unknown")).toBe(true);
  });

  it("keeps recipes separate from products", () => {
    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes.every((recipe) => !("price" in recipe))).toBe(true);
  });
});
