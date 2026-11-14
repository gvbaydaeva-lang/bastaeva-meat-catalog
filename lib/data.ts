import type { Category, Collection, Product, Recipe, Subcategory } from "./types";

export const storeContact = {
  address: "г. Элиста, 8 микрорайон, бульвар Бембеева, 8",
  phone: "+7 927 590-55-88",
  phoneHref: "tel:+79275905588"
} as const;

export const categories: Category[] = [
  { slug: "meat", name: "Мясо", description: "Баранина, телятина и домашняя свинина. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["meat-merino-lamb", "meat-steppe-veal", "meat-young-pork"] },
  { slug: "minced-meat", name: "Фарш", description: "Виды фарша для разных блюд. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["minced-mixed", "minced-beef", "minced-pork", "minced-turkey", "minced-chicken"] },
  { slug: "poultry", name: "Домашняя птица", description: "Домашняя птица и отдельные части. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["poultry-chicken", "poultry-turkey", "poultry-duck", "poultry-goose", "poultry-parts"] },
  { slug: "offal-soup-sets", name: "Субпродукты и суповые наборы", description: "Субпродукты и основы для супов. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["offal-tongue", "offal-liver", "soup-sets"] },
  { slug: "homemade-semi-finished", name: "Домашние полуфабрикаты", description: "Домашние полуфабрикаты для удобного приготовления. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["semi-beriki", "semi-manti", "semi-dumplings", "semi-cutlets", "semi-kupaty", "semi-meatballs", "semi-pancakes"] },
  { slug: "national-products", name: "Национальная продукция", description: "Традиционные мясные изделия. Ассортимент уточняется.", imageLabel: "Фото категории уточняется", subcategorySlugs: ["national-dotur", "national-kazy", "national-blood-sausage"] }
];

export const subcategories: Subcategory[] = [
  ["meat-merino-lamb", "meat", "Баранина меринос"], ["meat-steppe-veal", "meat", "Степная телятина"], ["meat-young-pork", "meat", "Домашняя молодая свинина"],
  ["minced-mixed", "minced-meat", "Смешанный фарш"], ["minced-beef", "minced-meat", "Говяжий фарш"], ["minced-pork", "minced-meat", "Свиной фарш"], ["minced-turkey", "minced-meat", "Фарш из индейки"], ["minced-chicken", "minced-meat", "Куриный фарш"],
  ["poultry-chicken", "poultry", "Курица"], ["poultry-turkey", "poultry", "Индейка"], ["poultry-duck", "poultry", "Утка"], ["poultry-goose", "poultry", "Гусь"], ["poultry-parts", "poultry", "Части птицы"],
  ["offal-tongue", "offal-soup-sets", "Язык"], ["offal-liver", "offal-soup-sets", "Печень"], ["soup-sets", "offal-soup-sets", "Суповые наборы"],
  ["semi-beriki", "homemade-semi-finished", "Берики"], ["semi-manti", "homemade-semi-finished", "Манты"], ["semi-dumplings", "homemade-semi-finished", "Вареники"], ["semi-cutlets", "homemade-semi-finished", "Котлеты"], ["semi-kupaty", "homemade-semi-finished", "Купаты"], ["semi-meatballs", "homemade-semi-finished", "Фрикадельки"], ["semi-pancakes", "homemade-semi-finished", "Блины"],
  ["national-dotur", "national-products", "Дотур"], ["national-kazy", "national-products", "Казы"], ["national-blood-sausage", "national-products", "Кровяная колбаса"]
].map(([slug, categorySlug, name]) => ({ slug, categorySlug, name, description: "Ассортимент уточняется.", imageLabel: "Фото подкатегории уточняется" }));

export const products: Product[] = [];

export const collections: Collection[] = [
  { slug: "soup", name: "Для супа", description: "Подборка продуктов для супа появится после подтверждения ассортимента.", productSlugs: [] },
  { slug: "frying", name: "Для жарки", description: "Подборка продуктов для жарки появится после подтверждения ассортимента.", productSlugs: [] },
  { slug: "stewing", name: "Для тушения", description: "Подборка продуктов для тушения появится после подтверждения ассортимента.", productSlugs: [] },
  { slug: "grill", name: "Для гриля", description: "Подборка продуктов для гриля появится после подтверждения ассортимента.", productSlugs: [] },
  { slug: "quick-dinner", name: "Быстрый ужин", description: "Подборка для быстрого ужина появится после подтверждения ассортимента.", productSlugs: [] },
  { slug: "national-dishes", name: "Национальные блюда", description: "Подборка для национальных блюд появится после подтверждения ассортимента.", productSlugs: [] }
];

export const recipes: Recipe[] = [
  { slug: "recipe-1", title: "Рецепт уточняется", excerpt: "Материалы для раздела рецептов будут добавлены отдельно.", imageLabel: "Фото рецепта уточняется" },
  { slug: "recipe-2", title: "Рецепт уточняется", excerpt: "Содержание появится после согласования с владельцем магазина.", imageLabel: "Фото рецепта уточняется" }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategory(slug: string) {
  return subcategories.find((subcategory) => subcategory.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function isProductReferenceValid(product: Product) {
  const subcategory = getSubcategory(product.subcategorySlug);
  return categories.some((category) => category.slug === product.categorySlug) && subcategory?.categorySlug === product.categorySlug;
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsBySubcategory(subcategorySlug: string) {
  return products.filter((product) => product.subcategorySlug === subcategorySlug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsByCollection(collectionSlug: string) {
  const collection = getCollection(collectionSlug);
  if (!collection) return [];
  const explicitSlugs = collection.productSlugs.length
    ? collection.productSlugs
    : products.filter((product) => product.purpose.includes(collectionSlug)).map((product) => product.slug);
  return explicitSlugs.flatMap((productSlug) => {
    const product = getProduct(productSlug);
    return product ? [product] : [];
  });
}
