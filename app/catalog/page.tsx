import { CategoryCard } from "@/components/category-card";
import { PageHeading } from "@/components/page-heading";
import { categories, products } from "@/lib/data";
import { CatalogBrowser } from "@/components/catalog-browser";

export default function CatalogPage() {
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог" title="Ассортимент магазина" description="Категории подготовлены как основа каталога. Состав, цены и наличие появятся после подтверждения данных." /><section className="py-12"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div></section><section className="border-t border-line py-12"><h2 className="font-display text-3xl">Все карточки товаров</h2><p className="mt-2 mb-7 text-sm text-ink/60">Демонстрация универсального шаблона без коммерческих сведений.</p><CatalogBrowser products={products} /></section></div>;
}
