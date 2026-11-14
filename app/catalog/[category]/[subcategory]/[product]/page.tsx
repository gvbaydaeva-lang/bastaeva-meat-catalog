import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ProductCard } from "@/components/product-card";
import { ProductContactActions } from "@/components/product-contact-actions";
import { ProductGallery } from "@/components/product-gallery";
import { getCategory, getProduct, getSubcategory, products } from "@/lib/data";
import { getProductRouteParams } from "@/lib/catalog-routes";
import { formatProductPrice, getProductAvailabilityLabel, getSimilarProducts } from "@/lib/product-detail";

type ProductPageProps = { params: { category: string; subcategory: string; product: string } };

const tagLabels = { new: "Новинка", popular: "Популярное", recommended: "Рекомендуем" } as const;

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.product);
  if (!product) return { title: "Товар уточняется — ИП Бастаева А.Д." };
  return {
    title: `${product.name} — ИП Бастаева А.Д.`,
    description: product.description,
    alternates: { canonical: `/catalog/${params.category}/${params.subcategory}/${params.product}` }
  };
}

export function generateStaticParams() {
  // GitHub Pages needs at least one generated path for every dynamic route.
  // This neutral path is not a product and is never linked from the catalog.
  return products.length
    ? getProductRouteParams()
    : [{ category: "meat", subcategory: "meat-merino-lamb", product: "__empty__" }];
}

export default function NestedProductPage({ params }: ProductPageProps) {
  const category = getCategory(params.category);
  const subcategory = getSubcategory(params.subcategory);
  const product = getProduct(params.product);
  if (!category || !subcategory || subcategory.categorySlug !== category.slug) notFound();
  if (!product && params.product === "__empty__") {
    return <div className="container-shell py-12"><PageHeading eyebrow="Каталог · товар" title="Товары пока не добавлены" description="Страница товара появится после передачи подтверждённого ассортимента." crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name, href: `/catalog/${category.slug}/${subcategory.slug}` }, { label: "Товар" }]} /><div className="py-12"><div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink/60">В этой подкатегории пока нет опубликованных товаров.</div></div></div>;
  }
  if (!product || product.categorySlug !== category.slug || product.subcategorySlug !== subcategory.slug) notFound();
  const similarProducts = getSimilarProducts(product, products);
  return <div className="container-shell py-12"><PageHeading eyebrow="Карточка товара" title={product.name} description={product.description} crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name, href: `/catalog/${category.slug}/${subcategory.slug}` }, { label: product.name }]} /><div className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"><ProductGallery product={product} /><div className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9"><div className="flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-[#F2E9DF] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/65">{tagLabels[tag]}</span>)}</div><p className="eyebrow mt-6">Информация о товаре</p><h2 className="mt-3 font-display text-3xl">{product.name}</h2><dl className="mt-7 grid gap-4 border-y border-line py-5 text-sm"><div className="flex justify-between gap-5"><dt className="text-ink/50">Цена</dt><dd className="text-right font-bold">{formatProductPrice(product)}</dd></div><div className="flex justify-between gap-5"><dt className="text-ink/50">Наличие</dt><dd className="text-right font-bold">{getProductAvailabilityLabel(product.availability)}</dd></div></dl><div className="mt-6 grid gap-5 text-sm leading-7 text-ink/65">{product.details ? <p>{product.details}</p> : null}{product.composition ? <div><p className="eyebrow">Состав</p><p className="mt-2">{product.composition}</p></div> : null}{product.characteristics.length ? <div><p className="eyebrow">Характеристики</p><ul className="mt-2 grid gap-1">{product.characteristics.map((item) => <li key={item}>• {item}</li>)}</ul></div> : null}{product.preparation?.length ? <div><p className="eyebrow">Рекомендации по приготовлению</p><ul className="mt-2 grid gap-1">{product.preparation.map((item) => <li key={item}>• {item}</li>)}</ul></div> : null}</div><div className="mt-8"><ProductContactActions productName={product.name} /></div></div></div><div className="flex flex-wrap gap-3 border-t border-line pt-8"><Link className="button-secondary" href={`/catalog/${category.slug}/${subcategory.slug}`}>← Вернуться в подкатегорию</Link><Link className="button-secondary" href={`/catalog/${category.slug}`}>Все товары категории</Link></div>{similarProducts.length ? <section className="border-t border-line py-14"><p className="section-kicker">Вам может понравиться</p><h2 className="font-display text-4xl">Похожие товары</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{similarProducts.map((similar) => <ProductCard key={similar.slug} product={similar} />)}</div></section> : null}</div>;
}
