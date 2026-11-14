import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { buildLocalBusinessJsonLd, getSeoConfig } from "@/lib/seo";
import { storeContact } from "@/lib/data";
import "./globals.css";

const seo = getSeoConfig();

export const metadata: Metadata = {
  metadataBase: new URL(`${seo.siteUrl}/`),
  title: { default: "ИП Бастаева А.Д. — мясной магазин в Элисте", template: "%s | ИП Бастаева А.Д." },
  description: "Сайт-каталог ИП Бастаева А.Д. в Элисте. Категории, полезная информация и контакты; ассортимент уточняется.",
  robots: { index: seo.shouldIndex, follow: seo.shouldIndex },
  openGraph: { siteName: "ИП Бастаева А.Д.", locale: "ru_RU", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><SiteHeader /><main>{children}</main><SiteFooter /><Analytics /><StructuredData data={buildLocalBusinessJsonLd({ name: "ИП Бастаева А.Д.", address: storeContact.address, phone: storeContact.phone, coordinates: storeContact.coordinates })} /></body></html>;
}
