import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Product } from '../types';
import productService from '../services/productService';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await productService.getFeaturedProducts(6);
      setFeaturedProducts(products);
    } catch (error: any) {
      toast.error('Failed to load featured products');
      console.error('Error fetching featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Elevate Your Style with NovaThreads
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover premium fashion that combines quality, comfort, and contemporary design.
              Shop the latest trends and timeless classics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Shop Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/products?category=Sale"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
              >
                View Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                100% secure payment processing
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest Trends</h3>
              <p className="text-gray-600">
                Always up-to-date with fashion trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular items. Quality craftsmanship meets modern design.
            </p>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  View All Products
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Men', 'Women', 'Accessories', 'Shoes'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-6xl text-gray-400">📦</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                  <p className="text-white/90 group-hover:text-white transition">
                    Explore Collection →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

