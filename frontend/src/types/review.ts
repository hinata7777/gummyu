export type Product = {
  id: number;
  name: string;
  source: string;
  external_id: string;
  image_url: string;
  product_url: string;
};

export type Review = {
  id: number;
  product_id: number;
  body: string;
  flavor_rating: number;
  texture_rating: number;
  hardness_level: number;
  created_at: string;
  product: Product;
};