import Link from "next/link";
import type { Route } from "next";
import { StructuredData } from "./structured-data";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { label: string; href?: Route }[] }) {
  const schemaItems = [{ label: "Главная", href: "/" }, ...items].map((item) => ({ label: item.label, ...(item.href ? { href: item.href as string } : {}) }));
  return <><nav aria-label="Хлебные крошки" className="mb-8 text-sm text-ink/50"><ol className="flex flex-wrap items-center gap-2"><li><Link className="hover:text-terracotta" href="/">Главная</Link></li>{items.map((item, index) => <li className="flex items-center gap-2" key={`${item.label}-${index}`}><span>/</span>{item.href ? <Link className="hover:text-terracotta" href={item.href}>{item.label}</Link> : <span className="text-ink">{item.label}</span>}</li>)}</ol></nav><StructuredData data={buildBreadcrumbJsonLd(schemaItems)} /></>;
}
