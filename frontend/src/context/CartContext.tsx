import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'novathreads_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { totalItems, totalPrice };
  };

  const addToCart = (
    product: Product,
    quantity: number,
    size: string,
    color: string
  ): void => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        };
        newItems = [...prevCart.items, newItem];
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const removeFromCart = (productId: string): void => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product._id !== productId);
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const clearCart = (): void => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  };

  const isInCart = (productId: string): boolean => {
    return cart.items.some((item) => item.product._id === productId);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

