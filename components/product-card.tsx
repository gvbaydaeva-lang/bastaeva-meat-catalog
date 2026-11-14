import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { PlaceholderMedia } from "./placeholder-media";

export function ProductCard({ product }: { product: Product }) {
  const availabilityLabels = { "in-stock": "В наличии", "out-of-stock": "Нет в наличии", unknown: "Уточняется" } as const;
  const tagLabels = { new: "Новинка", popular: "Популярное", recommended: "Рекомендуем" } as const;
  return <Link href={`/catalog/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`} className="focus-ring block overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1">{product.photos.length ? <Image src={product.photos[0]} alt={product.name} width={900} height={750} className="aspect-[1.2] w-full object-cover" unoptimized /> : <PlaceholderMedia label={product.imageLabel} className="aspect-[1.2] min-h-0" />}<div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl">{product.name}</h3><span className="rounded-full bg-[#F2E9DF] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/60">{availabilityLabels[product.availability]}</span></div><p className="mt-3 text-sm leading-6 text-ink/60">{product.description}</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-ink/60">{product.price !== null ? <span>{product.price} ₽{product.saleUnit ? ` / ${product.saleUnit}` : ""}</span> : null}{product.tags.map((tag) => <span key={tag} className="rounded-full bg-[#F2E9DF] px-2 py-1">{tagLabels[tag]}</span>)}</div></div></Link>;
}
