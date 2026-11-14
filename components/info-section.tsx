import type { ReactNode } from "react";

type InfoSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  tone?: "plain" | "paper" | "ink" | "sage";
};

const toneClasses = {
  plain: "",
  paper: "border-y border-line bg-white/55",
  ink: "bg-ink text-cream",
  sage: "bg-sage text-cream"
} as const;

export function InfoSection({ eyebrow, title, description, children, tone = "plain" }: InfoSectionProps) {
  const muted = tone === "plain" || tone === "paper" ? "text-ink/60" : "text-cream/70";
  return <section className={`py-16 sm:py-20 ${toneClasses[tone]}`}>
    <div className="container-shell grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
      <div><p className={`section-kicker ${tone === "ink" || tone === "sage" ? "text-[#E7B5A1] before:bg-[#E7B5A1]" : ""}`}>{eyebrow}</p><h2 className="max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h2></div>
      <div><p className={`max-w-2xl text-base leading-8 ${muted}`}>{description}</p>{children ? <div className="mt-8">{children}</div> : null}</div>
    </div>
  </section>;
}
