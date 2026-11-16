import { CategoryCard } from "@/components/category-card";
import { PageHeading } from "@/components/page-heading";
import { categories, products } from "@/lib/data";
import { CatalogBrowser } from "@/components/catalog-browser";
import { CollectionCard } from "@/components/collection-card";
import { collections } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({ title: "Каталог мясной продукции в Элисте", description: "47 позиций каталога ИП Бастаева А.Д. в Элисте. Наличие и актуальность цен уточняются.", path: "/catalog" });

export default function CatalogPage() {
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог" title="Ассортимент магазина" description="Шесть основных категорий и тематические подборки. В каталоге представлены 47 подготовленных позиций; наличие и актуальность цен уточняются." /><section className="py-12"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div></section><section className="border-t border-line py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-3xl">Подборки</h2><p className="mt-2 text-sm text-ink/60">Дополнительная навигация по назначению продуктов.</p></div></div><div className="mt-7 grid gap-4 md:grid-cols-2">{collections.map((collection) => <CollectionCard key={collection.slug} collection={collection} />)}</div></section><section className="border-t border-line py-12"><h2 className="font-display text-3xl">Все товары</h2><p className="mt-2 mb-7 text-sm text-ink/60">Показаны все 47 подготовленных позиций. Если цена ещё не подтверждена, карточка показывает «Цену уточняйте».</p><CatalogBrowser products={products} /></section></div>;
}
