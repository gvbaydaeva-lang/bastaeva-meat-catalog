import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { CatalogBrowser } from "@/components/catalog-browser";
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
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подкатегория" title={subcategory.name} description={subcategory.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name }]} /><div className="py-12"><CatalogBrowser products={items} initialCategorySlug={category.slug} initialSubcategorySlug={subcategory.slug} /></div></div>;
}
