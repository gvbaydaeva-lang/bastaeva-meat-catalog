import type { AvailabilityStatus, CatalogProductInput, Product, SaleUnit } from "./types";

export type CatalogValidationIssue = {
  code: string;
  recordIndex: number;
  field?: string;
  message: string;
};

export type CatalogValidationContext = {
  categories: Array<{ slug: string }>;
  subcategories: Array<{ slug: string; categorySlug: string }>;
  photoExists?: (photoPath: string) => boolean;
};

const saleUnits: SaleUnit[] = ["kg", "piece", "package"];
const availabilityStatuses: AvailabilityStatus[] = ["in-stock", "out-of-stock", "unknown"];
const requiredFields = ["slug", "name", "categorySlug", "subcategorySlug", "description", "imageLabel"] as const;

export function normalizeCatalogProducts(records: CatalogProductInput[]): Product[] {
  return records.map((record) => {
    const firstPrice = record.priceOptions[0] ?? null;

    return {
      ...record,
      details: record.details ?? null,
      preparation: record.preparation ?? [],
      priceOptions: record.priceOptions,
      price: firstPrice?.price ?? null,
      saleUnit: firstPrice?.saleUnit ?? null
    };
  });
}

export function validateCatalogProducts(records: CatalogProductInput[], context: CatalogValidationContext): CatalogValidationIssue[] {
  const issues: CatalogValidationIssue[] = [];
  const slugs = new Map<string, number>();
  const names = new Map<string, number>();
  const photos = new Map<string, number>();
  const categorySlugs = new Set(context.categories.map((category) => category.slug));
  const subcategories = new Map(context.subcategories.map((subcategory) => [subcategory.slug, subcategory.categorySlug]));

  const add = (recordIndex: number, code: string, message: string, field?: string) => issues.push({ recordIndex, code, field, message });

  records.forEach((record, recordIndex) => {
    for (const field of requiredFields) {
      if (typeof record[field] !== "string" || !record[field].trim()) add(recordIndex, "required-field", `Поле ${field} обязательно.`, field);
    }

    if (typeof record.slug === "string") {
      const previous = slugs.get(record.slug);
      if (previous !== undefined) add(recordIndex, "duplicate-slug", `Slug повторяется с записью ${previous + 1}.`, "slug");
      else slugs.set(record.slug, recordIndex);
    }

    if (typeof record.name === "string") {
      const key = record.name.trim().toLocaleLowerCase("ru");
      const previous = names.get(key);
      if (previous !== undefined) add(recordIndex, "duplicate-name", `Название повторяется с записью ${previous + 1}.`, "name");
      else if (key) names.set(key, recordIndex);
    }

    if (!categorySlugs.has(record.categorySlug)) add(recordIndex, "unknown-category", `Категория ${record.categorySlug} не найдена.`, "categorySlug");
    const subcategoryCategory = subcategories.get(record.subcategorySlug);
    if (!subcategoryCategory) add(recordIndex, "unknown-subcategory", `Подкатегория ${record.subcategorySlug} не найдена.`, "subcategorySlug");
    if (subcategoryCategory && subcategoryCategory !== record.categorySlug) add(recordIndex, "category-mismatch", "Подкатегория относится к другой категории.", "subcategorySlug");

    if (!availabilityStatuses.includes(record.availability)) add(recordIndex, "invalid-availability", "Недопустимое значение наличия.", "availability");
    if (!Array.isArray(record.priceOptions)) add(recordIndex, "required-field", "Поле priceOptions должно быть массивом.", "priceOptions");
    else record.priceOptions.forEach((option, optionIndex) => {
      if (!option.label?.trim()) add(recordIndex, "required-field", `У ценовой опции ${optionIndex + 1} нет label.`, "priceOptions");
      if (!Number.isFinite(option.price) || option.price <= 0) add(recordIndex, "invalid-price", `Цена ${optionIndex + 1} должна быть больше нуля.`, "priceOptions");
      if (!saleUnits.includes(option.saleUnit)) add(recordIndex, "invalid-sale-unit", `Единица ${optionIndex + 1} не поддерживается.`, "priceOptions");
    });

    if (!Array.isArray(record.photos)) add(recordIndex, "required-field", "Поле photos должно быть массивом.", "photos");
    else record.photos.forEach((photo) => {
      const previous = photos.get(photo);
      if (previous !== undefined) add(recordIndex, "duplicate-photo", `Фото повторяется с записью ${previous + 1}.`, "photos");
      else photos.set(photo, recordIndex);
      if (!photo.startsWith("/images/products/") || photo.includes("..") || !/\.(jpe?g|png|webp)$/i.test(photo)) add(recordIndex, "invalid-photo-path", "Фото должно быть локальным JPG, PNG или WebP в папке products.", "photos");
      else if (context.photoExists && !context.photoExists(photo)) add(recordIndex, "missing-photo", `Файл фото не найден: ${photo}.`, "photos");
    });
  });

  return issues;
}
