import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ИП Бастаева А.Д. — мясной магазин",
  description: "Сайт-каталог ИП Бастаева А.Д. Ассортимент и сведения уточняются."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
