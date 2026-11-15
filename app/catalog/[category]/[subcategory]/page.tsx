import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCategory, getProductsBySubcategory, getSubcategory } from "@/lib/data";
import { getSubcategoryRouteParams } from "@/lib/catalog-routes";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getSubcategoryRouteParams();
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory: subcategorySlug } = await params;
  const subcategory = getSubcategory(subcategorySlug);
  return subcategory ? buildPageMetadata({ title: `${subcategory.name} — каталог в Элисте`, description: `${subcategory.description} Каталог ИП Бастаева А.Д. в Элисте.`, path: `/catalog/${category}/${subcategory.slug}` }) : buildPageMetadata({ title: "Подкатегория каталога", description: "Подкатегория каталога ИП Бастаева А.Д.", path: "/catalog" });
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getCategory(categorySlug);
  const subcategory = getSubcategory(subcategorySlug);
  if (!category || !subcategory || subcategory.categorySlug !== category.slug) notFound();
  const items = getProductsBySubcategory(subcategory.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · подкатегория" title={subcategory.name} description={subcategory.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name }]} /><div className="py-12"><CatalogBrowser products={items} initialCategorySlug={category.slug} initialSubcategorySlug={subcategory.slug} /></div></div>;
}
