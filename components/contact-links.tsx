import { MapPin, MessageCircle, Phone } from "lucide-react";
import { contactChannels, getActiveContactChannels, storeContact } from "@/lib/data";

export function ContactLinks({ compact = false }: { compact?: boolean }) {
  const activeChannels = getActiveContactChannels();
  return <div className={compact ? "grid gap-2" : "flex flex-wrap gap-3"}>
    <a className="button-primary" href={storeContact.phoneHref} data-metrika-goal="phone_click"><Phone size={16} /> Позвонить</a>
    <a className="button-secondary" href={storeContact.routeHref} target="_blank" rel="noreferrer" data-metrika-goal="route_click"><MapPin size={16} /> Построить маршрут</a>
    {activeChannels.map((channel) => <a className="button-secondary" href={channel.href} key={channel.id} target="_blank" rel="noreferrer" data-metrika-goal="messenger_click" data-metrika-params={JSON.stringify({ channel: channel.id })}><MessageCircle size={16} /> {channel.label}</a>)}
    {!activeChannels.length ? <p className="basis-full text-sm leading-6 text-ink/55">Telegram, WhatsApp, Viber и ВКонтакте пока не подключены: рабочие ссылки магазина не подтверждены.</p> : null}
    {contactChannels.length && activeChannels.length < contactChannels.length ? <span className="sr-only">Доступны только подтверждённые способы связи.</span> : null}
  </div>;
}
