"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { PlaceholderMedia } from "./placeholder-media";

function GalleryImage({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 55vw" priority={priority} className={`object-contain ${className}`} unoptimized />;
}

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const photos = product.photos;
  const hasPhotos = photos.length > 0;
  const activePhoto = photos[activeIndex];

  useEffect(() => {
    if (!isZoomOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsZoomOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isZoomOpen]);

  const move = (direction: number) => {
    if (!hasPhotos) return;
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.changedTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
    if (Math.abs(delta) > 44) move(delta < 0 ? 1 : -1);
    setTouchStart(null);
  };

  if (!hasPhotos) return <PlaceholderMedia label={product.imageLabel} className="min-h-[22rem] rounded-[2rem] sm:min-h-[32rem]" />;

  return <div className="grid gap-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#E9E1D5]">
      <button type="button" className="focus-ring absolute inset-0 z-10 cursor-zoom-in" onClick={() => setIsZoomOpen(true)} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }} aria-label={`Увеличить фото ${product.name}`} />
      <GalleryImage src={activePhoto} alt={product.name} priority />
      {photos.length > 1 ? <>
        <button type="button" className="focus-ring absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl shadow-soft" onClick={() => move(-1)} aria-label="Предыдущее фото">‹</button>
        <button type="button" className="focus-ring absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl shadow-soft" onClick={() => move(1)} aria-label="Следующее фото">›</button>
        <span className="absolute bottom-4 right-4 z-20 rounded-full bg-ink/75 px-3 py-1 text-xs font-bold text-cream">{activeIndex + 1} / {photos.length}</span>
      </> : null}
    </div>
    {photos.length > 1 ? <div className="grid grid-cols-4 gap-3 sm:grid-cols-5" aria-label="Миниатюры фотографий">
      {photos.map((photo, index) => <button type="button" key={photo} className={`focus-ring relative aspect-square overflow-hidden rounded-xl bg-[#E9E1D5] ${index === activeIndex ? "ring-2 ring-terracotta ring-offset-2" : "opacity-70 transition hover:opacity-100"}`} onClick={() => setActiveIndex(index)} aria-label={`Показать фото ${index + 1}`} aria-pressed={index === activeIndex}><GalleryImage src={photo} alt="" /></button>)}
    </div> : null}
    {isZoomOpen ? <div className="fixed inset-0 z-50 grid place-items-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-label={`Увеличенное фото ${product.name}`} onClick={() => setIsZoomOpen(false)}>
      <button type="button" className="focus-ring absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream text-2xl text-ink" onClick={() => setIsZoomOpen(false)} aria-label="Закрыть увеличенное фото">×</button>
      <div className="relative h-[min(82vh,900px)] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}><GalleryImage src={activePhoto} alt={product.name} /></div>
    </div> : null}
  </div>;
}
