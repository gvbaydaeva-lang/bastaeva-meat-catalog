import { describe, expect, it } from "vitest";
import { buildBreadcrumbJsonLd, buildLocalBusinessJsonLd, buildPageMetadata, buildProductJsonLd, buildRecipeJsonLd, getSeoConfig, getSitemapPaths } from "./seo";

const baseEnv = {
  NEXT_PUBLIC_SITE_URL: "https://example.test/bastaeva-meat-catalog",
  NEXT_PUBLIC_ENABLE_INDEXING: "false",
  GITHUB_ACTIONS: "true"
};

describe("SEO policy", () => {
  it("builds basePath-aware absolute URLs", () => {
    const seo = getSeoConfig(baseEnv);
    expect(seo.siteUrl).toBe("https://example.test/bastaeva-meat-catalog");
    expect(seo.absoluteUrl("/catalog")).toBe("https://example.test/bastaeva-meat-catalog/catalog");
  });

  it("keeps technical builds noindex by default", () => {
    expect(getSeoConfig(baseEnv).shouldIndex).toBe(false);
    expect(buildPageMetadata({ title: "Каталог", description: "Описание", path: "/catalog", env: baseEnv }).robots).toEqual({ index: false, follow: false });
  });

  it("allows indexing only after an explicit switch", () => {
    const env = { ...baseEnv, NEXT_PUBLIC_SITE_URL: "https://meat.example", NEXT_PUBLIC_ENABLE_INDEXING: "true", GITHUB_ACTIONS: "true" };
    expect(getSeoConfig(env).shouldIndex).toBe(true);
    expect(buildPageMetadata({ title: "Каталог", description: "Описание", path: "/catalog", env }).robots).toEqual({ index: true, follow: true });
  });

  it("excludes empty technical routes and includes only confirmed entities", () => {
    expect(getSitemapPaths({ categories: [{ slug: "meat" }], subcategories: [{ categorySlug: "meat", slug: "lamb" }], collections: [{ slug: "soup" }], products: [], recipes: [] })).toEqual([
      "/", "/about", "/catalog", "/catalog/meat", "/catalog/meat/lamb", "/collections", "/collections/soup", "/contacts", "/delivery", "/quality", "/recipes"
    ]);
  });

  it("builds conservative breadcrumbs and local business data", () => {
    const breadcrumb = buildBreadcrumbJsonLd([{ label: "Каталог", href: "/catalog" }, { label: "Мясо" }], baseEnv);
    expect(breadcrumb.itemListElement).toHaveLength(2);
    const business = buildLocalBusinessJsonLd({ name: "ИП Бастаева А.Д.", address: "Республика Калмыкия, г. Элиста, 8 микрорайон, бульвар Бембеева, 8", phone: "+7 927 590-55-88", coordinates: { latitude: 46.304724, longitude: 44.312429 }, env: baseEnv });
    expect(business.telephone).toBe("+7 927 590-55-88");
    expect(business.aggregateRating).toBeUndefined();
    expect(business.review).toBeUndefined();
  });

  it("creates product and recipe schema only from complete confirmed records", () => {
    expect(buildProductJsonLd({ name: "", description: "", slug: "", categorySlug: "meat", subcategorySlug: "lamb", photos: [], price: null, saleUnit: null, availability: "unknown" }, baseEnv)).toBeUndefined();
    expect(buildRecipeJsonLd({ slug: "pending", title: "", excerpt: "", imageLabel: "", ingredients: [], steps: [] }, baseEnv)).toBeUndefined();
    expect(buildProductJsonLd({ name: "Говядина", description: "Подтверждено", slug: "beef", categorySlug: "meat", subcategorySlug: "lamb", photos: [], price: null, saleUnit: null, availability: "unknown" }, baseEnv)?.["@type"]).toBe("Product");
  });

  it("does not expose disputed prices in product schema", () => {
    expect(buildProductJsonLd({
      name: "Казы",
      description: "Товар из ассортимента магазина.",
      slug: "kazy",
      categorySlug: "national-products",
      subcategorySlug: "national-kazy",
      photos: [],
      price: 1100,
      saleUnit: "kg",
      priceDisplay: "inquiry",
      availability: "unknown"
    }, baseEnv)?.offers).toBeUndefined();
  });
});
