export interface User {
  _id: string; // or id, based on backend
  user_id: string;
  name: string;
  phone_number: string;
  // Add other fields as discovered from API
}

export interface ProductImage {
  product_image: string;
}

export interface ProductSize {
  size_id: number;
  variation_product_id: number;
  size_name: string;
  status: boolean;
  price: number;
}

export interface VariationColor {
  color_id: number;
  color_name: string;
  color_images: string[];
  sizes: ProductSize[];
  status: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  mrp: number;
  sale_price: number;
  discount: number;
  new: boolean;
  out_of_stock: boolean;
  product_images: ProductImage[];
  variation_colors: VariationColor[];
}

export interface Order {
  created_date: string;
  order_id: string;
  product_amount: number;
  product_mrp: number;
  product_name: string;
  product_price: number;
  product_image?: string;
  quantity: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}
