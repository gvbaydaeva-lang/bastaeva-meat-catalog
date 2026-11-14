import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { InfoSection } from "@/components/info-section";
import { PageHeading } from "@/components/page-heading";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { qualitySections } from "@/lib/content";

export default function QualityPage() {
  return <div>
    <div className="container-shell py-12"><PageHeading eyebrow="Качество" title="Прозрачность без лишних обещаний" description="Раздел подготовлен для сведений о продукции, составе, происхождении, хранении и подтверждающих документах. Фактические материалы будут добавляться после проверки." /></div>
    <InfoSection eyebrow="Что будет в разделе" title="Каждый факт должен иметь источник" description="Здесь не публикуются фиктивные сертификаты, гарантии или универсальные обещания. Для каждой категории можно будет показать только подтверждённые сведения." tone="paper"><div className="grid gap-4 md:grid-cols-3">{qualitySections.map((section) => <article className="rounded-2xl bg-cream p-6" key={section.title}><FileCheck2 className="text-terracotta" size={22} /><p className="eyebrow mt-6">{section.label}</p><h2 className="mt-3 font-display text-2xl">{section.title}</h2><p className="mt-3 text-sm leading-6 text-ink/60">{section.description}</p></article>)}</div></InfoSection>
    <section className="container-shell py-16 sm:py-20"><div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><p className="section-kicker">Документы</p><h2 className="font-display text-4xl sm:text-5xl">Место для подтверждающих материалов</h2><p className="mt-5 max-w-xl text-base leading-7 text-ink/60">Фотографии документов можно будет разместить здесь после проверки актуальности и разрешения на публикацию.</p><Link href="/contacts" className="button-secondary mt-7">Уточнить информацию <ArrowRight size={16} /></Link></div><PlaceholderMedia label="Фото документов появится после согласования" className="min-h-72 rounded-[1.5rem]" /></div></section>
  </div>;
}
