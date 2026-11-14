import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { normalizeCatalogProducts, validateCatalogProducts } from "./catalog-import";
import type { CatalogProductInput } from "./types";

const input: CatalogProductInput = {
  slug: "test-product",
  name: "Тестовый товар",
  categorySlug: "homemade-semi-finished",
  subcategorySlug: "semi-manti",
  description: "Тестовая запись, не для публикации",
  details: null,
  priceOptions: [
    { label: "За упаковку", price: 450, saleUnit: "package" },
    { label: "За килограмм", price: 900, saleUnit: "kg" }
  ],
  composition: null,
  characteristics: [],
  photos: [],
  availability: "unknown",
  imageLabel: "Тестовое фото",
  purpose: [],
  preparation: [],
  tags: []
};

describe("catalog product normalization", () => {
  it("keeps multiple prices and derives the legacy display price from the first option", () => {
    const [product] = normalizeCatalogProducts([input]);

    expect(product.priceOptions).toEqual(input.priceOptions);
    expect(product.price).toBe(450);
    expect(product.saleUnit).toBe("package");
  });

  it("normalizes an empty production source without creating products", () => {
    expect(normalizeCatalogProducts([])).toEqual([]);
  });
});

const validationContext = {
  categories: [{ slug: "homemade-semi-finished" }],
  subcategories: [{ slug: "semi-manti", categorySlug: "homemade-semi-finished" }],
  photoExists: (photo: string) => photo === "/images/products/homemade-semi-finished/semi-manti/manti.webp"
};

describe("catalog product validation", () => {
  it("accepts a complete record with a confirmed local photo", () => {
    expect(validateCatalogProducts([{ ...input, photos: ["/images/products/homemade-semi-finished/semi-manti/manti.webp"] }], validationContext)).toEqual([]);
  });

  it("rejects missing required fields and duplicate slugs or names", () => {
    const issues = validateCatalogProducts([
      input,
      { ...input, name: "Тестовый товар", slug: "test-product-2" },
      { ...input, name: "", slug: "test-product" }
    ], validationContext);

    expect(issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(["duplicate-slug", "duplicate-name", "required-field"]));
  });

  it("rejects unknown or mismatched category references", () => {
    const issues = validateCatalogProducts([{ ...input, categorySlug: "unknown", subcategorySlug: "semi-manti" }], validationContext);

    expect(issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(["unknown-category", "category-mismatch"]));
  });

  it("rejects invalid prices and sale units", () => {
    const issues = validateCatalogProducts([{ ...input, priceOptions: [{ label: "", price: 0, saleUnit: "box" as never }] }], validationContext);

    expect(issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(["invalid-price", "invalid-sale-unit", "required-field"]));
  });

  it("rejects invalid availability and missing or unsafe photos", () => {
    const issues = validateCatalogProducts([{
      ...input,
      availability: "available" as never,
      photos: ["https://example.com/photo.jpg", "/images/products/homemade-semi-finished/semi-manti/missing.webp", "/images/products/homemade-semi-finished/semi-manti/missing.webp"]
    }], validationContext);

    expect(issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(["invalid-availability", "invalid-photo-path", "missing-photo", "duplicate-photo"]));
  });
});

describe("catalog validation CLI", () => {
  const cli = resolve("scripts/validate-catalog.mjs");
  const viteNode = resolve("node_modules/.bin/vite-node");

  it("accepts valid JSON and CSV fixtures", () => {
    expect(() => execFileSync(viteNode, [cli, "tests/fixtures/catalog-valid.json"], { encoding: "utf8" })).not.toThrow();
    expect(() => execFileSync(viteNode, [cli, "tests/fixtures/catalog-valid.csv"], { encoding: "utf8" })).not.toThrow();
  });

  it("returns a non-zero status and row-specific errors for invalid fixtures", () => {
    expect(() => execFileSync(viteNode, [cli, "tests/fixtures/catalog-invalid.json"], { encoding: "utf8", stdio: "pipe" })).toThrow(/row|record|slug|price/i);
    expect(() => execFileSync(viteNode, [cli, "tests/fixtures/catalog-invalid.csv"], { encoding: "utf8", stdio: "pipe" })).toThrow(/row|record|category|price/i);
  });

  it("rejects CSV files without the required header fields", () => {
    expect(() => execFileSync(viteNode, [cli, "tests/fixtures/catalog-invalid-header.csv"], { encoding: "utf8", stdio: "pipe" })).toThrow(/header|slug|priceOptions/i);
  });

  it("writes normalized JSON only when the input is valid and output is explicit", () => {
    const directory = mkdtempSync(join("/private/tmp", "bastaeva-import-"));
    const output = join(directory, "products.json");
    try {
      execFileSync(viteNode, [cli, "tests/fixtures/catalog-valid.csv", "--output", output], { encoding: "utf8" });
      const written = JSON.parse(readFileSync(output, "utf8"));
      expect(written[0].price).toBe(null);
      expect(written[0].categorySlug).toBe("homemade-semi-finished");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
