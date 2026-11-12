import Link from "next/link";
import type { Product } from "@/lib/types";
import { PlaceholderMedia } from "./placeholder-media";

export function ProductCard({ product }: { product: Product }) {
  return <Link href={`/catalog/product/${product.slug}`} className="focus-ring block overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1"><PlaceholderMedia label={product.imageLabel} className="aspect-[1.2] min-h-0" /><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl">{product.name}</h3><span className="rounded-full bg-[#F2E9DF] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/60">Уточняется</span></div><p className="mt-3 text-sm leading-6 text-ink/60">{product.description}</p></div></Link>;
}
