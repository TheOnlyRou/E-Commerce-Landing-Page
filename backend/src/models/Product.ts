import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  imageUrl: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Men', 'Women', 'Accessories', 'Shoes', 'Sale'],
    },
    sizes: {
      type: [String],
      default: ['XS', 'S', 'M', 'L', 'XL'],
    },
    colors: {
      type: [String],
      default: ['Black', 'White'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, 'Stock quantity cannot be negative'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
productSchema.index({ category: 1, featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);

