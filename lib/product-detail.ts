import type { AvailabilityStatus, Product } from "./types";

const saleUnitLabels = {
  kg: "кг",
  piece: "шт.",
  package: "упаковка"
} as const;

const availabilityLabels: Record<AvailabilityStatus, string> = {
  "in-stock": "В наличии",
  "out-of-stock": "Нет в наличии",
  unknown: "Наличие уточняется"
};

export function formatProductPrice(product: Product) {
  if (product.price === null || product.price <= 0) return "Цену уточняйте";
  const unit = product.saleUnit ? ` / ${saleUnitLabels[product.saleUnit]}` : "";
  return `${product.price} ₽${unit}`;
}

export function getProductAvailabilityLabel(status: AvailabilityStatus) {
  return availabilityLabels[status];
}

export function getProductInquiryMessage(productName: string) {
  return `Здравствуйте! Подскажите, пожалуйста, есть ли в наличии ${productName}?`;
}

export function getSimilarProducts(product: Product, allProducts: Product[], limit = 4) {
  const candidates = allProducts.filter((candidate) => candidate.slug !== product.slug);
  const sameSubcategory = candidates.filter((candidate) => candidate.subcategorySlug === product.subcategorySlug);
  const sameCategory = candidates.filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.subcategorySlug !== product.subcategorySlug
  );
  return [...sameSubcategory, ...sameCategory].slice(0, limit);
}
