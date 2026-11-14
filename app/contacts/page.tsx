import { MapPin, Phone } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { ContactLinks } from "@/components/contact-links";
import { YandexMap } from "@/components/yandex-map";
import { storeContact } from "@/lib/data";

export default function ContactsPage() {
  return <div className="container-shell py-12">
    <PageHeading eyebrow="Контакты" title="Будем на связи" description="Здесь можно уточнить актуальную информацию о магазине, наличии и способах получения продукции." />
    <div className="grid gap-5 py-12 md:grid-cols-2"><div className="rounded-[1.5rem] bg-ink p-8 text-cream"><p className="eyebrow text-[#E7B5A1]">Связь</p><h2 className="mt-3 font-display text-3xl">Мясо тут, в Элисте</h2><div className="mt-8 grid gap-4 text-sm text-cream/75"><a className="flex items-start gap-3" href={storeContact.phoneHref}><Phone size={18} className="mt-0.5" /> {storeContact.phone}</a><p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5" /> {storeContact.address}</p><p className="text-sm leading-6 text-cream/55">График работы не указан: подтверждённых данных в ТЗ нет.</p></div><a href={storeContact.phoneHref} className="button-primary mt-8 bg-terracotta hover:bg-cream hover:text-ink">Позвонить в магазин</a></div><YandexMap compact /></div>
    <section className="border-t border-line py-12"><p className="section-kicker">Способы связи</p><h2 className="font-display text-3xl">Выберите удобный способ</h2><div className="mt-6"><ContactLinks /></div></section>
  </div>;
}
