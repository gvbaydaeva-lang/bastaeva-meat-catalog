"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { storeContact } from "@/lib/data";

const links = [
  ["Каталог", "/catalog"], ["Подборки", "/collections"], ["О магазине", "/about"], ["Качество", "/quality"],
  ["Рецепты", "/recipes"], ["Доставка", "/delivery"], ["Контакты", "/contacts"]
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/95 backdrop-blur">
    <div className="container-shell flex h-[76px] items-center justify-between gap-6">
      <Link href="/" className="focus-ring flex items-center gap-3" onClick={() => setOpen(false)}>
        <span className="grid size-10 place-items-center rounded-full bg-ink text-sm font-bold text-cream">Б</span>
        <span><span className="block font-display text-xl leading-none">Бастаева</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">мясной магазин</span></span>
      </Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Основная навигация">
        {links.map(([label, href]) => <Link className="focus-ring text-sm text-ink/75 transition hover:text-terracotta" key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="flex items-center gap-3"><a href={storeContact.phoneHref} className="button-secondary hidden min-h-10 px-4 lg:inline-flex">Позвонить</a><button className="focus-ring grid size-11 place-items-center rounded-full border border-line lg:hidden" aria-expanded={open} aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div>
    <div className={cn("border-t border-line bg-cream lg:hidden", open ? "block" : "hidden")}>
      <nav className="container-shell flex flex-col gap-1 py-4" aria-label="Мобильная навигация">
        {links.map(([label, href]) => <Link className="focus-ring rounded-lg px-3 py-3 text-base hover:bg-white" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
