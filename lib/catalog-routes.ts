import { categories, collections, products, subcategories } from "./data";

export function getCategoryRouteParams() {
  return categories.map(({ slug: category }) => ({ category }));
}

export function getSubcategoryRouteParams() {
  return subcategories.map(({ categorySlug: category, slug: subcategory }) => ({ category, subcategory }));
}

export function getProductRouteParams() {
  return products.map(({ categorySlug: category, subcategorySlug: subcategory, slug: product }) => ({ category, subcategory, product }));
}

export function getCollectionRouteParams() {
  return collections.map(({ slug: collection }) => ({ collection }));
}
