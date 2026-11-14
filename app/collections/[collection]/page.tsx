import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { ProductCard } from "@/components/product-card";
import { getCollection, getProductsByCollection } from "@/lib/data";
import { getCollectionRouteParams } from "@/lib/catalog-routes";

export function generateStaticParams() {
  return getCollectionRouteParams();
}

export default function CollectionPage({ params }: { params: { collection: string } }) {
  const collection = getCollection(params.collection);
  if (!collection) notFound();
  const items = getProductsByCollection(collection.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подборка" title={collection.name} description={collection.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: "Подборки", href: "/collections" }, { label: collection.name }]} /><div className="grid gap-5 py-12 md:grid-cols-2">{items.length ? items.map((product) => <ProductCard key={product.slug} product={product} />) : <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60 md:col-span-2">В этой подборке пока нет опубликованных товаров.</div>}</div></div>;
}
