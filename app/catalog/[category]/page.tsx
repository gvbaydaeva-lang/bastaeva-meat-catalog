import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { ProductCard } from "@/components/product-card";
import { SubcategoryCard } from "@/components/subcategory-card";
import { getCategory, getProductsByCategory, subcategories } from "@/lib/data";
import { getCategoryRouteParams } from "@/lib/catalog-routes";

export function generateStaticParams() { return getCategoryRouteParams(); }

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category); if (!category) notFound();
  const items = getProductsByCategory(category.slug);
  const categorySubcategories = subcategories.filter((subcategory) => subcategory.categorySlug === category.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · категория" title={category.name} description={category.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]} /><section className="py-12"><h2 className="font-display text-3xl">Разделы категории</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categorySubcategories.map((subcategory) => <SubcategoryCard key={subcategory.slug} subcategory={subcategory} />)}</div></section><section className="border-t border-line py-12"><h2 className="font-display text-3xl">Товары</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{items.length ? items.map((product) => <ProductCard key={product.slug} product={product} />) : <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60 md:col-span-2">В этой категории пока нет опубликованных товаров.</div>}</div></section></div>;
}
