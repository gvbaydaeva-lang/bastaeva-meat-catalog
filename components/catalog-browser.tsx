"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())), [products, query]);
  return <div><div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><label className="sr-only" htmlFor="catalog-search">Поиск по каталогу</label><input id="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по каталогу" className="focus-ring w-full rounded-full border border-line bg-white px-5 py-3 text-sm sm:max-w-sm" /><p className="text-sm text-ink/50">{filtered.length} карточек</p></div>{filtered.length ? <div className="grid gap-5 md:grid-cols-2">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60">Ничего не найдено. Попробуйте другой запрос.</div>}</div>;
}
