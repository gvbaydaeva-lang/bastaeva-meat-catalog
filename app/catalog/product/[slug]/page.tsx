import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/contact-buttons";
import { PageHeading } from "@/components/page-heading";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { getProduct, products } from "@/lib/data";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug); if (!product) notFound();
  return <div className="container-shell py-12"><PageHeading eyebrow="Карточка товара" title={product.name} description="Это универсальный шаблон карточки. Фактические сведения будут добавлены после подтверждения." crumbs={[{ label: "Каталог", href: "/catalog" }, { label: product.name }]} /><div className="grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-start"><PlaceholderMedia label={product.imageLabel} className="min-h-[24rem] rounded-[2rem]" /><div className="rounded-[2rem] bg-white p-7 shadow-soft"><p className="eyebrow">Статус данных</p><h2 className="mt-3 font-display text-3xl">Информация уточняется</h2><p className="mt-4 leading-7 text-ink/65">{product.description}</p><dl className="mt-7 grid gap-4 border-y border-line py-5 text-sm"><div className="flex justify-between gap-5"><dt className="text-ink/50">Цена</dt><dd className="font-bold">Не указана</dd></div><div className="flex justify-between gap-5"><dt className="text-ink/50">Наличие</dt><dd className="font-bold">Уточняется</dd></div></dl><div className="mt-7"><ContactButtons /></div></div></div></div>;
}
