import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/lib/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  return <Link href={`/collections/${collection.slug}`} className="focus-ring flex items-center justify-between gap-5 rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-xl"><span><span className="eyebrow">Подборка</span><span className="mt-2 block font-display text-2xl">{collection.name}</span><span className="mt-2 block text-sm leading-6 text-ink/60">{collection.description}</span></span><ArrowRight className="shrink-0 text-terracotta" size={19} /></Link>;
}
