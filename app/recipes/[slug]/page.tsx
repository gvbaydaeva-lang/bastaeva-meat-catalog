import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { EmptyContent } from "@/components/empty-content";
import { PageHeading } from "@/components/page-heading";
import { recipes } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { buildRecipeJsonLd } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export async function generateStaticParams() {
  return recipes.length ? recipes.map((recipe) => ({ slug: recipe.slug })) : [{ slug: "pending" }];
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);
  return recipe ? buildPageMetadata({ title: `${recipe.title} — рецепт`, description: recipe.excerpt, path: `/recipes/${recipe.slug}` }) : buildPageMetadata({ title: "Рецепт уточняется", description: "Рецепт появится после согласования материалов.", path: "/recipes" });
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);
  if (!recipe && slug === "pending") {
    return <div className="container-shell py-12"><PageHeading eyebrow="Рецепт" title="Страница рецепта появится после согласования" description="Этот технический маршрут показывает корректное пустое состояние и не содержит выдуманного блюда." crumbs={[{ label: "Рецепты", href: "/recipes" }]} /><div className="py-12"><EmptyContent label="Материалы уточняются" title="Пока здесь нет опубликованного рецепта" description="Когда появятся подтверждённые ингредиенты и шаги приготовления, эта структура будет использована для отдельной страницы рецепта." href="/recipes" actionLabel="Вернуться к рецептам" /></div></div>;
  }
  if (!recipe) notFound();

  return <div className="container-shell py-12">
    <StructuredData data={buildRecipeJsonLd(recipe)} />
    <PageHeading eyebrow={recipe.category} title={recipe.title} description={recipe.excerpt} crumbs={[{ label: "Рецепты", href: "/recipes" }]} />
    <div className="grid gap-8 py-12 lg:grid-cols-[.75fr_1.25fr]"><section><h2 className="font-display text-3xl">Ингредиенты</h2><ul className="mt-5 grid gap-3">{recipe.ingredients.map((ingredient) => <li className="rounded-xl border border-line bg-white p-4 text-sm" key={ingredient}>{ingredient}</li>)}</ul></section><section><h2 className="font-display text-3xl">Приготовление</h2><ol className="mt-5 grid gap-3">{recipe.steps.map((step, index) => <li className="flex gap-4 rounded-xl border border-line bg-white p-4 text-sm leading-6" key={step}><span className="font-display text-xl text-terracotta">{index + 1}</span><span>{step}</span></li>)}</ol></section></div>
    <EmptyContent label="Подходящие продукты" title="Связанные позиции появятся вместе с рецептом" description="Когда рецепт и ассортимент будут подтверждены, здесь можно будет перейти к подходящим товарам каталога." href="/catalog" actionLabel="Открыть каталог" />
    <Link href="/recipes" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-terracotta"><ArrowLeft size={16} /> Все рецепты <ArrowRight size={16} /></Link>
  </div>;
}
