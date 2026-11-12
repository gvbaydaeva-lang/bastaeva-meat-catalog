import { Breadcrumbs } from "./breadcrumbs";
import type { Route } from "next";

export function PageHeading({ eyebrow, title, description, crumbs = [] }: { eyebrow: string; title: string; description: string; crumbs?: { label: string; href?: Route }[] }) {
  return <div className="border-b border-line pb-12"><Breadcrumbs items={crumbs} /><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-ink/65">{description}</p></div>;
}
