// Product data types

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  affiliateLink: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export interface ProductsData {
  categories: Category[];
}

export interface CategoryFilter {
  id: string;
  name: string;
}
