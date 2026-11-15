import { ProductCard } from "@/components/product-card";
import { PageHeading } from "@/components/page-heading";
import { getSubcategory } from "@/lib/data";
import { homemadeSemiFinishedPreviewProducts } from "@/data/preview-homemade-semi-finished";

export const metadata = {
  title: "Предпросмотр карточек полуфабрикатов",
  description: "Локальный предпросмотр семи карточек домашних полуфабрикатов до согласования ассортимента."
};

export default function HomemadeSemiFinishedPreviewPage() {
  return <div className="container-shell py-12">
    <PageHeading
      eyebrow="Локальный предпросмотр · без публикации"
      title="Первые карточки полуфабрикатов"
      description="Визуальная проверка семи фотографий в существующем стиле каталога. Названия предварительные, цены и составы не заполнены до согласования."
      crumbs={[{ label: "Каталог", href: "/catalog" }, { label: "Предпросмотр карточек" }]}
    />
    <section className="py-10" aria-labelledby="preview-note-title">
      <div className="rounded-2xl border border-terracotta/25 bg-[#f5e5dc] p-5 sm:flex sm:items-start sm:justify-between sm:gap-8">
        <div>
          <p className="eyebrow">Согласование обязательно</p>
          <h2 id="preview-note-title" className="mt-2 font-display text-2xl">Это не опубликованные товары</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/70">Все карточки показаны только для оценки фото, сетки и пропорций. Данные не добавлены в каталог, а ссылки ведут на будущие адреса карточек.</p>
        </div>
        <span className="mt-4 inline-flex shrink-0 rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-terracotta sm:mt-0">7 фото · 0 цен</span>
      </div>
    </section>
    <section aria-labelledby="preview-grid-title">
      <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Сетка карточек</p>
          <h2 id="preview-grid-title" className="font-display text-3xl">Домашние полуфабрикаты</h2>
        </div>
        <p className="text-sm text-ink/55">На телефоне: одна колонка · от 640 px: две · от 1280 px: три</p>
      </div>
      <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {homemadeSemiFinishedPreviewProducts.map((product) => {
          const subcategory = getSubcategory(product.subcategorySlug);
          return <div key={product.slug} className="flex min-w-0 flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">{subcategory?.name ?? "Подкатегория уточняется"}</p>
            <ProductCard product={product} imageFit="contain" className="h-full" />
          </div>;
        })}
      </div>
    </section>
  </div>;
}
