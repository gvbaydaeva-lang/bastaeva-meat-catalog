import { PageHeading } from "@/components/page-heading";
import { EmptyContent } from "@/components/empty-content";
import { recipes, recipeCategories } from "@/lib/content";

export default function RecipesPage() {
  return <div className="container-shell py-12">
    <PageHeading eyebrow="Рецепты" title="Что приготовить дома" description="Раздел подготовлен для согласованных рецептов с ингредиентами, шагами приготовления и ссылками на подходящие продукты каталога." />
    <div className="flex flex-wrap gap-2 py-8" aria-label="Категории рецептов">{recipeCategories.map((category) => <span className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink/65" key={category}>{category}</span>)}</div>
    {recipes.length ? <div className="grid gap-5 py-4 sm:grid-cols-2 lg:grid-cols-3">{recipes.map((recipe) => <article key={recipe.slug} className="rounded-2xl bg-white p-6 shadow-soft"><p className="eyebrow">{recipe.category}</p><h2 className="mt-3 font-display text-3xl">{recipe.title}</h2><p className="mt-3 text-sm leading-7 text-ink/60">{recipe.excerpt}</p></article>)}</div> : <div className="py-4"><EmptyContent label="Материалы уточняются" title="Рецепты пока не опубликованы" description="Мы не заполняем этот раздел выдуманными материалами. После согласования здесь появятся карточки рецептов, категории и подходящие продукты." href="/catalog" actionLabel="Перейти в каталог" /></div>}
  </div>;
}
