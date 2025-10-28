import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Product } from '../types';
import productService from '../services/productService';
import toast from 'react-hot-toast';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [category, search, currentPage]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts({
        category: category || undefined,
        search: search || undefined,
        page: currentPage,
        limit: 12,
      });
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (error: any) {
      toast.error('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCurrentPage(1);
    if (newCategory) {
      searchParams.set('category', newCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const categories = ['All', 'Men', 'Women', 'Accessories', 'Shoes', 'Sale'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {category ? `${category} Collection` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {search && `Search results for "${search}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold flex items-center">
                  <Filter size={20} className="mr-2" />
                  Filters
                </span>
                <ChevronDown
                  size={20}
                  className={`transform transition ${showFilters ? 'rotate-180' : ''}`}
                />
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat === 'All' ? '' : cat)}
                      className={`block w-full text-left px-4 py-2 rounded transition ${
                        (cat === 'All' && !category) || cat === category
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {isLoading ? (
              <LoadingSpinner />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

