import api from './api';
import { Product, ProductsResponse } from '../types';

interface ProductFilters {
  category?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

/**
 * Product service for handling product-related API calls
 */
class ProductService {
  /**
   * Get all products with optional filters
   */
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data.product;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    const response = await api.get('/products/featured', {
      params: { limit },
    });
    return response.data.data.products;
  }

  /**
   * Create a new product (Admin only)
   */
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await api.post('/products', productData);
    return response.data.data.product;
  }

  /**
   * Update a product (Admin only)
   */
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data.product;
  }

  /**
   * Delete a product (Admin only)
   */
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export default new ProductService();

