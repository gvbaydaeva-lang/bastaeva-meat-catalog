import type { MetadataRoute } from "next";
import { categories, collections, products, recipes, subcategories } from "@/lib/data";
import { getSeoConfig, getSitemapPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const seo = getSeoConfig();
  if (!seo.shouldIndex) return [];
  return getSitemapPaths({ categories, subcategories, collections, products, recipes }).map((path) => ({ url: seo.absoluteUrl(path), changeFrequency: "monthly" as const }));
}
