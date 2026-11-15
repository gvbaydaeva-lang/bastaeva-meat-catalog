import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCollection, getProductsByCollection } from "@/lib/data";
import { getCollectionRouteParams } from "@/lib/catalog-routes";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCollectionRouteParams();
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = await params;
  const collection = getCollection(collectionSlug);
  return collection ? buildPageMetadata({ title: `${collection.name} — подборка`, description: collection.description, path: `/collections/${collection.slug}` }) : buildPageMetadata({ title: "Подборка каталога", description: "Подборка каталога ИП Бастаева А.Д.", path: "/collections" });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = await params;
  const collection = getCollection(collectionSlug);
  if (!collection) notFound();
  const items = getProductsByCollection(collection.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подборка" title={collection.name} description={collection.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: "Подборки", href: "/collections" }, { label: collection.name }]} /><div className="py-12"><CatalogBrowser products={items} /></div></div>;
}
