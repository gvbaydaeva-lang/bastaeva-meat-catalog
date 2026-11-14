import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { CatalogBrowser } from "@/components/catalog-browser";
import { SubcategoryCard } from "@/components/subcategory-card";
import { getCategory, getProductsByCategory, subcategories } from "@/lib/data";
import { getCategoryRouteParams } from "@/lib/catalog-routes";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() { return getCategoryRouteParams(); }

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  return category ? buildPageMetadata({ title: `${category.name} — каталог в Элисте`, description: `${category.description} Каталог ИП Бастаева А.Д. в Элисте.`, path: `/catalog/${category.slug}` }) : buildPageMetadata({ title: "Категория каталога", description: "Категория каталога ИП Бастаева А.Д.", path: "/catalog" });
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category); if (!category) notFound();
  const items = getProductsByCategory(category.slug);
  const categorySubcategories = subcategories.filter((subcategory) => subcategory.categorySlug === category.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · категория" title={category.name} description={category.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]} /><section className="py-12"><h2 className="font-display text-3xl">Разделы категории</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categorySubcategories.map((subcategory) => <SubcategoryCard key={subcategory.slug} subcategory={subcategory} />)}</div></section><section className="border-t border-line py-12"><h2 className="font-display text-3xl">Товары</h2><p className="mt-2 mb-7 text-sm text-ink/60">Поиск и фильтры применяются совместно.</p><CatalogBrowser products={items} initialCategorySlug={category.slug} /></section></div>;
}
