import type { Product } from "./types";

export type ContentSection = {
  title: string;
  description: string;
  label: string;
};

export type Recipe = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageLabel: string;
  ingredients: string[];
  steps: string[];
  productSlugs: string[];
};

export const homeTrustNotes = [
  "Публикуем только сведения, которые можно проверить",
  "Ассортимент, цены и характеристики появятся после подтверждения",
  "Актуальные вопросы можно уточнить напрямую в магазине"
] as const;

export const aboutSections: ContentSection[] = [
  { label: "Что здесь будет", title: "Магазин мясной продукции", description: "Здесь появится подтверждённое представление магазина, его направлений и торговой точки." },
  { label: "Ассортимент", title: "Категории для навигации", description: "Каталог уже разделён по направлениям: мясо, фарш, птица, суповые наборы, домашние полуфабрикаты и национальная продукция." },
  { label: "Материалы", title: "Фото и факты — по мере готовности", description: "Фотографии магазина, витрин и торговой точки можно добавить после получения и согласования материалов." }
];

export const qualitySections: ContentSection[] = [
  { label: "Продукция", title: "Состав и происхождение", description: "Сведения о составе, происхождении и характеристиках будут опубликованы только для подтверждённых позиций каталога." },
  { label: "Хранение", title: "Условия хранения", description: "Температурные режимы, сроки и правила хранения появятся после получения точных данных для конкретных продуктов." },
  { label: "Документы", title: "Сертификаты и подтверждения", description: "Фотографии документов можно разместить здесь после проверки их актуальности и разрешения на публикацию." }
];

export const deliverySteps: ContentSection[] = [
  { label: "01", title: "Самовывоз", description: "Получение из магазина по адресу, указанному в разделе контактов. График и порядок выдачи уточняются." },
  { label: "02", title: "Доставка", description: "Возможность, география, сроки и стоимость доставки уточняются напрямую до публикации условий." },
  { label: "03", title: "Оформление", description: "Способ оформления заказа и состав информации для получения будут добавлены после согласования процесса." }
];

export const recipeCategories = ["Все блюда", "Домашняя кухня", "Национальная кухня", "Быстрый ужин"] as const;

export const recipes: Recipe[] = [];

export function getPopularProducts(items: Product[]): Product[] {
  return items.filter((product) => product.tags.includes("popular"));
}
