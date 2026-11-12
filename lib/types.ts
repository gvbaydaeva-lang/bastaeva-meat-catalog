export type AvailabilityStatus = "in-stock" | "out-of-stock" | "unknown";

export type Category = {
  slug: string;
  name: string;
  description: string;
  imageLabel: string;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  price: number | null;
  availability: AvailabilityStatus;
  imageLabel: string;
};

export type Recipe = {
  slug: string;
  title: string;
  excerpt: string;
  imageLabel: string;
};
