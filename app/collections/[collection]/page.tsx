import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCollection, getProductsByCollection } from "@/lib/data";
import { getCollectionRouteParams } from "@/lib/catalog-routes";

export function generateStaticParams() {
  return getCollectionRouteParams();
}

export default function CollectionPage({ params }: { params: { collection: string } }) {
  const collection = getCollection(params.collection);
  if (!collection) notFound();
  const items = getProductsByCollection(collection.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подборка" title={collection.name} description={collection.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: "Подборки", href: "/collections" }, { label: collection.name }]} /><div className="py-12"><CatalogBrowser products={items} /></div></div>;
}
