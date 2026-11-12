import Link from "next/link";
import type { Category } from "@/lib/types";
import { PlaceholderMedia } from "./placeholder-media";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  return <Link href={`/catalog/${category.slug}`} className="focus-ring group block overflow-hidden rounded-[1.5rem] border border-line/70 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl"><div className="relative"><PlaceholderMedia label={category.imageLabel} className="aspect-[1.25] min-h-0" /><span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-cream text-ink transition group-hover:bg-terracotta group-hover:text-cream"><ArrowUpRight size={18} /></span></div><div className="p-5"><p className="eyebrow">Категория</p><h3 className="mt-2 font-display text-2xl">{category.name}</h3><p className="mt-2 text-sm text-ink/60">{category.description}</p></div></Link>;
}
