import type { Metadata } from "next";

type SeoEnv = Record<string, string | undefined>;

export type SeoConfig = {
  siteUrl: string;
  shouldIndex: boolean;
  absoluteUrl: (path?: string) => string;
};

const defaultSiteUrl = "https://gvbaydaeva-lang.github.io/bastaeva-meat-catalog";

function normalizePath(path = "/") {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash === "/" ? "/" : withLeadingSlash.replace(/\/+$/, "");
}

export function getSeoConfig(env: SeoEnv = process.env): SeoConfig {
  const siteUrl = (env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/+$/, "");
  const isTechnicalPagesHost = siteUrl.includes("github.io/");
  const shouldIndex = env.NEXT_PUBLIC_ENABLE_INDEXING === "true" && !isTechnicalPagesHost;
  return { siteUrl, shouldIndex, absoluteUrl: (path = "/") => `${siteUrl}${normalizePath(path)}` };
}

export function buildPageMetadata({ title, description, path, image, env = process.env }: { title: string; description: string; path: string; image?: string; env?: SeoEnv }): Metadata {
  const seo = getSeoConfig(env);
  const url = seo.absoluteUrl(path);
  const imageUrl = image ? seo.absoluteUrl(image) : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: seo.shouldIndex, follow: seo.shouldIndex },
    openGraph: { type: "website", locale: "ru_RU", url, title, description, ...(imageUrl ? { images: [{ url: imageUrl, alt: title }] } : {}) },
    twitter: { card: imageUrl ? "summary_large_image" : "summary", title, description, ...(imageUrl ? { images: [imageUrl] } : {}) }
  };
}

type RouteRecord = { slug: string };
type SubcategoryRecord = { categorySlug: string; slug: string };
type ProductRouteRecord = RouteRecord & { categorySlug: string; subcategorySlug: string };

export function getSitemapPaths({ categories, subcategories, collections, products, recipes }: { categories: RouteRecord[]; subcategories: SubcategoryRecord[]; collections: RouteRecord[]; products: ProductRouteRecord[]; recipes: RouteRecord[] }) {
  const paths = ["/", "/about", "/catalog", ...categories.map(({ slug }) => `/catalog/${slug}`), ...subcategories.map(({ categorySlug, slug }) => `/catalog/${categorySlug}/${slug}`), "/collections", ...collections.map(({ slug }) => `/collections/${slug}`), "/contacts", "/delivery", "/quality", "/recipes", ...recipes.map(({ slug }) => `/recipes/${slug}`), ...products.map(({ categorySlug, subcategorySlug, slug }) => `/catalog/${categorySlug}/${subcategorySlug}/${slug}`)];
  return [...new Set(paths)].filter((path) => !path.includes("undefined") && !path.includes("__empty__") && path !== "/recipes/pending");
}

export function buildBreadcrumbJsonLd(items: { label: string; href?: string }[], env: SeoEnv = process.env) {
  const seo = getSeoConfig(env);
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: seo.absoluteUrl(item.href) } : {}) })) };
}

export function buildLocalBusinessJsonLd({ name, address, phone, coordinates, env = process.env }: { name: string; address: string; phone: string; coordinates: { latitude: number; longitude: number }; env?: SeoEnv }): Record<string, unknown> {
  const seo = getSeoConfig(env);
  return { "@context": "https://schema.org", "@type": "LocalBusiness", name, description: address, url: seo.siteUrl, telephone: phone, address: { "@type": "PostalAddress", streetAddress: "8 микрорайон, бульвар Бембеева, 8", addressLocality: "Элиста", addressRegion: "Республика Калмыкия", addressCountry: "RU" }, geo: { "@type": "GeoCoordinates", latitude: coordinates.latitude, longitude: coordinates.longitude } };
}

export function buildProductJsonLd(product: { name: string; description: string; slug: string; categorySlug: string; subcategorySlug: string; photos: string[]; price: number | null; saleUnit: string | null; availability: string }, env: SeoEnv = process.env): Record<string, unknown> | undefined {
  const seo = getSeoConfig(env);
  if (!product.name || !product.description || !product.slug) return undefined;
  return { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, url: seo.absoluteUrl(`/catalog/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`), ...(product.photos[0] ? { image: [seo.absoluteUrl(product.photos[0])] } : {}), ...(product.price !== null ? { offers: { "@type": "Offer", price: product.price, priceCurrency: "RUB", availability: product.availability === "in-stock" ? "https://schema.org/InStock" : product.availability === "out-of-stock" ? "https://schema.org/OutOfStock" : "https://schema.org/Discontinued" } } : {}) };
}

export function buildRecipeJsonLd(recipe: { slug: string; title: string; excerpt: string; imageLabel: string; ingredients: string[]; steps: string[] }, env: SeoEnv = process.env): Record<string, unknown> | undefined {
  const seo = getSeoConfig(env);
  if (!recipe.title || !recipe.excerpt || !recipe.ingredients.length || !recipe.steps.length) return undefined;
  return { "@context": "https://schema.org", "@type": "Recipe", name: recipe.title, description: recipe.excerpt, url: seo.absoluteUrl(`/recipes/${recipe.slug}`), recipeIngredient: recipe.ingredients, recipeInstructions: recipe.steps.map((text) => ({ "@type": "HowToStep", text })) };
}
