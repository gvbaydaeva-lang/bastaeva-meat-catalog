export type AvailabilityStatus = "in-stock" | "out-of-stock" | "unknown";

export type Category = {
  slug: string;
  name: string;
  description: string;
  imageLabel: string;
  subcategorySlugs: string[];
};

export type Subcategory = {
  slug: string;
  categorySlug: string;
  name: string;
  description: string;
  imageLabel: string;
};

export type ProductTag = "new" | "popular" | "recommended";

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  description: string;
  details?: string | null;
  price: number | null;
  saleUnit: "kg" | "piece" | "package" | null;
  composition: string | null;
  characteristics: string[];
  photos: string[];
  availability: AvailabilityStatus;
  imageLabel: string;
  purpose: string[];
  preparation?: string[];
  tags: ProductTag[];
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  productSlugs: string[];
};

export type Recipe = {
  slug: string;
  title: string;
  excerpt: string;
  imageLabel: string;
};
