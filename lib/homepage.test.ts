import { describe, expect, it } from "vitest";
import { categories, products, storeContact } from "./data";
import { getPopularProducts, recipes } from "./content";

describe("homepage content foundation", () => {
  it("keeps the six catalog categories available for the homepage", () => {
    expect(categories).toHaveLength(6);
    expect(categories.map((category) => category.name)).toEqual([
      "Мясо",
      "Фарш",
      "Домашняя птица",
      "Субпродукты и суповые наборы",
      "Домашние полуфабрикаты",
      "Национальная продукция"
    ]);
  });

  it("uses the confirmed store contact details", () => {
    expect(storeContact).toEqual({
      address: "г. Элиста, 8 микрорайон, бульвар Бембеева, 8",
      phone: "+7 927 590-55-88",
      phoneHref: "tel:+79275905588"
    });
  });

  it("does not create popular product cards when the catalog is empty", () => {
    expect(getPopularProducts([])).toEqual([]);
  });

  it("keeps recipes unpublished until confirmed materials exist", () => {
    expect(recipes).toEqual([]);
  });

  it("does not treat products without a popular tag as popular", () => {
    expect(getPopularProducts(products)).toEqual([]);
  });
});
