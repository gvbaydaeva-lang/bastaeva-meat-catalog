import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { ProductCard } from "@/components/product-card";
import { getCategory, getProductsBySubcategory, getSubcategory } from "@/lib/data";
import { getSubcategoryRouteParams } from "@/lib/catalog-routes";

export function generateStaticParams() {
  return getSubcategoryRouteParams();
}

export default function SubcategoryPage({ params }: { params: { category: string; subcategory: string } }) {
  const category = getCategory(params.category);
  const subcategory = getSubcategory(params.subcategory);
  if (!category || !subcategory || subcategory.categorySlug !== category.slug) notFound();
  const items = getProductsBySubcategory(subcategory.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подкатегория" title={subcategory.name} description={subcategory.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name }]} /><div className="grid gap-5 py-12 md:grid-cols-2">{items.length ? items.map((product) => <ProductCard key={product.slug} product={product} />) : <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60 md:col-span-2">В этой подкатегории пока нет опубликованных товаров.</div>}</div></div>;
}
