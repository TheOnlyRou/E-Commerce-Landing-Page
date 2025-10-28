import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    
    toast.success('Checkout functionality coming soon!');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cart.totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      to={`/products/${item.product._id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="text-lg font-bold text-primary-600 mt-2">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-600 hover:text-red-700"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                  toast.success('Cart cleared');
                }
              }}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{cart.totalPrice > 50 ? 'FREE' : '$5.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (estimated)</span>
                  <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        cart.totalPrice +
                        (cart.totalPrice > 50 ? 0 : 5) +
                        cart.totalPrice * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                Continue Shopping
              </Link>

              {/* Free Shipping Notice */}
              {cart.totalPrice < 50 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - cart.totalPrice).toFixed(2)} more to get free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

