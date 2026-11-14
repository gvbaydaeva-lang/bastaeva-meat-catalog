import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InfoSection } from "@/components/info-section";
import { PageHeading } from "@/components/page-heading";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { aboutSections } from "@/lib/content";

export default function AboutPage() {
  return <div>
    <div className="container-shell py-12"><PageHeading eyebrow="О магазине" title="Место, где важны продукт и понятный выбор" description="Здесь собрана структура будущего рассказа о магазине — без выдуманной истории, сроков работы и неподтверждённых преимуществ." /></div>
    <InfoSection eyebrow="Представление" title="Магазин мясной продукции в Элисте" description="Страница готова принять подтверждённые сведения о торговой точке, направлениях ассортимента и способах связи. Пока опубликованы только данные, которые уже есть в проекте."><Link href="/catalog" className="button-primary">Перейти в каталог <ArrowRight size={16} /></Link></InfoSection>
    <section className="container-shell grid gap-5 py-16 sm:py-20 md:grid-cols-3">{aboutSections.map((section) => <article className="rounded-[1.5rem] bg-white p-7 shadow-soft" key={section.title}><p className="eyebrow">{section.label}</p><h2 className="mt-4 font-display text-3xl leading-tight">{section.title}</h2><p className="mt-4 text-sm leading-7 text-ink/60">{section.description}</p></article>)}</section>
    <section className="border-y border-line bg-white/55 py-16 sm:py-20"><div className="container-shell grid gap-5 md:grid-cols-2"><PlaceholderMedia label="Фото магазина уточняется" className="min-h-72 rounded-[1.5rem]" /><PlaceholderMedia label="Фото витрины уточняется" className="min-h-72 rounded-[1.5rem]" /></div></section>
  </div>;
}
