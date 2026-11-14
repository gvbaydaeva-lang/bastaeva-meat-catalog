import { MapPin } from "lucide-react";
import { storeContact } from "@/lib/data";

export function YandexMap({ compact = false }: { compact?: boolean }) {
  return <div className="overflow-hidden rounded-[1.5rem] border border-line bg-[#E9E1D5]">
    <iframe
      className={compact ? "h-64 w-full border-0 sm:h-72" : "h-80 w-full border-0 sm:h-[28rem]"}
      src={storeContact.mapEmbedHref}
      title="Яндекс Карта: магазин ИП Бастаева А.Д."
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <div className="flex flex-col gap-3 border-t border-line bg-cream p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex gap-2 text-sm leading-6 text-ink/70"><MapPin size={18} className="mt-1 shrink-0 text-terracotta" />{storeContact.address}</p>
      <a className="button-secondary shrink-0" href={storeContact.routeHref} target="_blank" rel="noreferrer" data-metrika-goal="route_click">Построить маршрут</a>
    </div>
  </div>;
}
