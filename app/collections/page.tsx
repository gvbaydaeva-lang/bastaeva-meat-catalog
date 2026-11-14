import { CollectionCard } from "@/components/collection-card";
import { PageHeading } from "@/components/page-heading";
import { collections } from "@/lib/data";

export default function CollectionsPage() {
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подборки" title="Выберите назначение" description="Тематические подборки помогают найти продукты для блюда. Они не заменяют основные категории каталога." crumbs={[{ label: "Каталог", href: "/catalog" }, { label: "Подборки" }]} /><div className="grid gap-5 py-12 md:grid-cols-2">{collections.map((collection) => <CollectionCard key={collection.slug} collection={collection} />)}</div></div>;
}
