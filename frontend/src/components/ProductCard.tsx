import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Price and Category */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-3 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2">
          <ShoppingCart size={18} />
          <span>View Details</span>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

