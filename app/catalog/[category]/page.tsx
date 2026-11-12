import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { ProductCard } from "@/components/product-card";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";

export function generateStaticParams() { return categories.map(({ slug }) => ({ category: slug })); }

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category); if (!category) notFound();
  const items = getProductsByCategory(category.slug);
  return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · категория" title={category.name} description={category.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]} /><div className="grid gap-5 py-12 md:grid-cols-2">{items.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div>;
}
