import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { InfoSection } from "@/components/info-section";
import { PageHeading } from "@/components/page-heading";
import { deliverySteps } from "@/lib/content";
import { storeContact } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({ title: "Доставка и самовывоз в Элисте", description: "Информация о получении продукции ИП Бастаева А.Д. в Элисте. Сроки, тарифы и география уточняются.", path: "/delivery" });

export default function DeliveryPage() {
  return <div>
    <div className="container-shell py-12"><PageHeading eyebrow="Доставка и самовывоз" title="Получение продукции — с понятными условиями" description="Структура страницы готова, но тарифы, сроки, география и график работы пока не публикуются без подтверждения." /></div>
    <InfoSection eyebrow="Как это устроено" title="Три понятных шага до получения" description="До согласования процесса сайт не обещает конкретные сроки или стоимость. Актуальные детали можно уточнить у магазина." tone="paper"><div className="grid gap-4 md:grid-cols-3">{deliverySteps.map((step) => <article className="rounded-2xl bg-cream p-6" key={step.label}><span className="font-display text-4xl text-terracotta/65">{step.label}</span><h2 className="mt-7 font-display text-2xl">{step.title}</h2><p className="mt-3 text-sm leading-6 text-ink/60">{step.description}</p></article>)}</div></InfoSection>
    <section className="container-shell py-16 sm:py-20"><div className="rounded-[2rem] bg-ink p-8 text-cream sm:p-12"><p className="section-kicker text-[#E7B5A1] before:bg-[#E7B5A1]">Контактный блок</p><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="font-display text-4xl sm:text-5xl">Уточните доступный способ получения</h2><p className="mt-5 max-w-xl text-base leading-7 text-cream/65">Телефон и адрес магазина опубликованы в разделе контактов. Остальные условия появятся после согласования.</p></div><div className="flex flex-wrap gap-3"><a href={storeContact.phoneHref} className="button-primary bg-terracotta hover:bg-cream hover:text-ink" data-metrika-goal="phone_click"><Phone size={17} /> {storeContact.phone}</a><Link href="/contacts" className="button-secondary border-cream/30 text-cream"><ArrowRight size={16} /> Контакты</Link></div></div></div></section>
  </div>;
}
