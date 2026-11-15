import type { MetadataRoute } from "next";
import { getSeoConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const seo = getSeoConfig();
  return { rules: { userAgent: "*", allow: seo.shouldIndex ? "/" : undefined, disallow: seo.shouldIndex ? ["/catalog/*/*/*"] : "/" }, ...(seo.shouldIndex ? { sitemap: `${seo.siteUrl}/sitemap.xml` } : {}) };
}
