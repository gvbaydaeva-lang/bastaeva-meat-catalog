export function PlaceholderMedia({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`relative grid min-h-48 place-items-center overflow-hidden bg-[#E9E1D5] ${className}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(184,92,66,.16),transparent_40%),linear-gradient(135deg,transparent_50%,rgba(102,112,91,.12))]" /><span className="relative max-w-[13rem] px-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-ink/50">{label}</span></div>;
}
