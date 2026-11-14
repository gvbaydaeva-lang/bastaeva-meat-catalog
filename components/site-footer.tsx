import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { storeContact } from "@/lib/data";

export function SiteFooter() {
  return <footer className="border-t border-line bg-ink py-14 text-cream"><div className="container-shell grid gap-12 md:grid-cols-[1.2fr_.8fr_1fr]">
    <div><p className="font-display text-3xl">Бастаева</p><p className="mt-4 max-w-xs text-sm leading-6 text-cream/60">Мясо тут — сайт-каталог магазина ИП Бастаева А.Д. Ассортимент и условия обновляются после подтверждения.</p></div>
    <div><p className="eyebrow text-[#E7B5A1]">Разделы</p><div className="mt-4 grid gap-3 text-sm text-cream/75"><Link href="/catalog">Каталог</Link><Link href="/collections">Подборки</Link><Link href="/about">О магазине</Link><Link href="/quality">Качество</Link><Link href="/delivery">Доставка</Link><Link href="/contacts">Контакты</Link></div></div>
    <div><p className="eyebrow text-[#E7B5A1]">Контакты</p><div className="mt-4 grid gap-3 text-sm leading-6 text-cream/70"><a className="flex gap-3" href={storeContact.phoneHref}><Phone size={18} className="mt-1 shrink-0" />{storeContact.phone}</a><p className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0" />{storeContact.address}</p></div></div>
  </div><div className="container-shell mt-12 border-t border-cream/15 pt-5 text-xs text-cream/40"><div className="flex flex-col gap-2 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} ИП Бастаева А.Д.</span><span>Юридическая информация будет добавлена отдельно.</span></div></div></footer>;
}
