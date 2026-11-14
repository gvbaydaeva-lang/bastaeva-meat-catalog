import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, FileQuestion } from "lucide-react";

type EmptyContentProps = { label: string; title: string; description: string; href?: Route; actionLabel?: string };

export function EmptyContent({ label, title, description, href, actionLabel }: EmptyContentProps) {
  return <div className="rounded-[1.75rem] border border-dashed border-terracotta/45 bg-white/55 p-7 sm:p-10">
    <FileQuestion className="text-terracotta" size={25} aria-hidden="true" />
    <p className="eyebrow mt-6">{label}</p>
    <h2 className="mt-3 max-w-xl font-display text-3xl sm:text-4xl">{title}</h2>
    <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/60">{description}</p>
    {href && actionLabel ? <Link href={href} className="button-secondary mt-7">{actionLabel}<ArrowRight size={16} /></Link> : null}
  </div>;
}
