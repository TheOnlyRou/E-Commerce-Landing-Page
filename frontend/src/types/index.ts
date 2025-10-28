// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Product types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Shoes' | 'Sale';
  sizes: string[];
  colors: string[];
  imageUrl: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Newsletter types
export interface NewsletterResponse {
  success: boolean;
  message: string;
}

// API Error types
export interface ApiError {
  success: false;
  message: string;
  errors?: any[];
}

