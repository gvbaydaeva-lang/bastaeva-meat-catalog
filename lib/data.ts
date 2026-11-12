import type { Category, Product, Recipe } from "./types";

export const storeContact = {
  address: "г. Элиста, 8 микрорайон, бульвар Бембеева, 8",
  phone: "+7 927 590-55-88",
  phoneHref: "tel:+79275905588"
} as const;

export const categories: Category[] = [
  { slug: "meat", name: "Мясо", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" },
  { slug: "poultry", name: "Птица", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" },
  { slug: "sausages", name: "Колбасы", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" },
  { slug: "semi-finished", name: "Полуфабрикаты", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" },
  { slug: "delicacies", name: "Деликатесы", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" },
  { slug: "grill", name: "Для гриля", description: "Ассортимент уточняется", imageLabel: "Фото категории уточняется" }
];

export const products: Product[] = categories.flatMap((category) => [
  {
    slug: `${category.slug}-sample`,
    name: `Товар категории «${category.name}»`,
    categorySlug: category.slug,
    description: "Описание и характеристики будут добавлены после согласования ассортимента.",
    price: null,
    availability: "unknown",
    imageLabel: "Фото товара уточняется"
  }
]);

export const recipes: Recipe[] = [
  { slug: "recipe-1", title: "Рецепт уточняется", excerpt: "Материалы для раздела рецептов будут добавлены отдельно.", imageLabel: "Фото рецепта уточняется" },
  { slug: "recipe-2", title: "Рецепт уточняется", excerpt: "Содержание появится после согласования с владельцем магазина.", imageLabel: "Фото рецепта уточняется" }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}
