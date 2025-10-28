import { useState, useEffect } from 'react';
import { Product } from '../types';
import productService from '../services/productService';

interface UseProductsOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  refetch: () => void;
}

/**
 * Custom hook for fetching and managing products
 */
export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(options.page || 1);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProducts({
        category: options.category,
        search: options.search,
        page: currentPage,
        limit: options.limit || 12,
        featured: options.featured,
      });
      
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options.category, options.search, currentPage, options.featured]);

  return {
    products,
    isLoading,
    error,
    totalPages,
    currentPage,
    refetch: fetchProducts,
  };
};

