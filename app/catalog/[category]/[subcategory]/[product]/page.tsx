import { notFound } from "next/navigation";
import Image from "next/image";
import { ContactButtons } from "@/components/contact-buttons";
import { PageHeading } from "@/components/page-heading";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { getCategory, getProduct, getSubcategory } from "@/lib/data";
import { getProductRouteParams } from "@/lib/catalog-routes";

export function generateStaticParams() {
  return getProductRouteParams();
}

export default function NestedProductPage({ params }: { params: { category: string; subcategory: string; product: string } }) {
  const category = getCategory(params.category);
  const subcategory = getSubcategory(params.subcategory);
  const product = getProduct(params.product);
  if (!category || !subcategory || !product || subcategory.categorySlug !== category.slug || product.categorySlug !== category.slug || product.subcategorySlug !== subcategory.slug) notFound();
  const availabilityLabels = { "in-stock": "В наличии", "out-of-stock": "Нет в наличии", unknown: "Уточняется" } as const;
  const saleUnitLabels = { kg: "кг", piece: "шт.", package: "упаковка" } as const;
  return <div className="container-shell py-12"><PageHeading eyebrow="Карточка товара" title={product.name} description="Подтверждённые сведения о товаре отображаются после добавления материалов." crumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${category.slug}` }, { label: subcategory.name, href: `/catalog/${category.slug}/${subcategory.slug}` }, { label: product.name }]} /><div className="grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">{product.photos.length ? <div className="overflow-hidden rounded-[2rem] bg-white"><Image src={product.photos[0]} alt={product.name} width={1200} height={900} className="h-auto w-full object-cover" unoptimized /></div> : <PlaceholderMedia label={product.imageLabel} className="min-h-[24rem] rounded-[2rem]" />}<div className="rounded-[2rem] bg-white p-7 shadow-soft"><p className="eyebrow">Статус данных</p><h2 className="mt-3 font-display text-3xl">{product.description}</h2><dl className="mt-7 grid gap-4 border-y border-line py-5 text-sm"><div className="flex justify-between gap-5"><dt className="text-ink/50">Цена</dt><dd className="font-bold">{product.price === null ? "Не указана" : `${product.price} ₽`}{product.saleUnit ? ` / ${saleUnitLabels[product.saleUnit]}` : ""}</dd></div><div className="flex justify-between gap-5"><dt className="text-ink/50">Наличие</dt><dd className="font-bold">{availabilityLabels[product.availability]}</dd></div>{product.composition ? <div className="flex justify-between gap-5"><dt className="text-ink/50">Состав</dt><dd className="max-w-[65%] text-right font-bold">{product.composition}</dd></div> : null}</dl>{product.characteristics.length ? <div className="mt-6"><p className="eyebrow">Характеристики</p><ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/65">{product.characteristics.map((item) => <li key={item}>• {item}</li>)}</ul></div> : null}{product.purpose.length ? <div className="mt-6"><p className="eyebrow">Назначение</p><p className="mt-3 text-sm leading-6 text-ink/65">{product.purpose.join(", ")}</p></div> : null}<div className="mt-7"><ContactButtons /></div></div></div></div>;
}
