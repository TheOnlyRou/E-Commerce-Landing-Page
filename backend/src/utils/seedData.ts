import { Product } from '../models/Product';
import { User } from '../models/User';

/**
 * Seed initial products into the database
 */
export const seedProducts = async (): Promise<void> => {
  try {
    const count = await Product.countDocuments();
    
    if (count > 0) {
      console.log('📦 Products already exist, skipping seed');
      return;
    }

    const products = [
      {
        name: 'Classic Cotton T-Shirt',
        description: 'Premium quality cotton t-shirt with a modern fit. Perfect for everyday wear, this versatile piece combines comfort with style.',
        price: 29.99,
        category: 'Men',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Navy', 'Gray'],
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
        ],
        inStock: true,
        stockQuantity: 150,
        featured: true,
        rating: 4.5,
        reviewCount: 128,
      },
      {
        name: 'Elegant Summer Dress',
        description: 'Flowing summer dress with floral patterns. Lightweight fabric perfect for warm weather and special occasions.',
        price: 79.99,
        category: 'Women',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Floral Blue', 'Floral Pink', 'Solid White'],
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
        ],
        inStock: true,
        stockQuantity: 85,
        featured: true,
        rating: 4.8,
        reviewCount: 94,
      },
      {
        name: 'Leather Crossbody Bag',
        description: 'Handcrafted genuine leather crossbody bag with adjustable strap. Features multiple compartments for organization.',
        price: 129.99,
        category: 'Accessories',
        sizes: ['One Size'],
        colors: ['Brown', 'Black', 'Tan'],
        imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        ],
        inStock: true,
        stockQuantity: 45,
        featured: false,
        rating: 4.7,
        reviewCount: 67,
      },
      {
        name: 'Premium Denim Jeans',
        description: 'Classic fit denim jeans made from premium stretch denim. Comfortable, durable, and stylish for any occasion.',
        price: 89.99,
        category: 'Men',
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        ],
        inStock: true,
        stockQuantity: 120,
        featured: true,
        rating: 4.6,
        reviewCount: 203,
      },
      {
        name: 'Wool Blend Blazer',
        description: 'Sophisticated wool blend blazer with a tailored fit. Perfect for professional settings and formal events.',
        price: 199.99,
        category: 'Women',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Charcoal'],
        imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
        images: [
          'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
          'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500',
        ],
        inStock: true,
        stockQuantity: 60,
        featured: false,
        rating: 4.9,
        reviewCount: 45,
      },
      {
        name: 'Running Sneakers Pro',
        description: 'High-performance running sneakers with advanced cushioning technology. Breathable mesh upper and responsive sole.',
        price: 149.99,
        category: 'Shoes',
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['White/Blue', 'Black/Red', 'Gray/Green'],
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
        ],
        inStock: true,
        stockQuantity: 95,
        featured: true,
        rating: 4.7,
        reviewCount: 312,
      },
      {
        name: 'Cashmere Scarf',
        description: 'Luxurious 100% cashmere scarf. Incredibly soft and warm, perfect for cold weather styling.',
        price: 89.99,
        category: 'Accessories',
        sizes: ['One Size'],
        colors: ['Burgundy', 'Camel', 'Navy', 'Gray'],
        imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
        images: [
          'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
        ],
        inStock: true,
        stockQuantity: 75,
        featured: false,
        rating: 4.8,
        reviewCount: 89,
      },
      {
        name: 'Slim Fit Chinos',
        description: 'Modern slim fit chinos in premium cotton twill. Versatile pants that work for both casual and smart-casual looks.',
        price: 69.99,
        category: 'Men',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Khaki', 'Navy', 'Olive', 'Black'],
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        images: [
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        ],
        inStock: true,
        stockQuantity: 110,
        featured: false,
        rating: 4.4,
        reviewCount: 156,
      },
      {
        name: 'Silk Blouse',
        description: 'Elegant silk blouse with delicate button details. Luxurious fabric with a flattering drape.',
        price: 119.99,
        category: 'Women',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Ivory', 'Blush', 'Black'],
        imageUrl: 'https://images.unsplash.com/photo-1564257577-1f5b5d2f7e6e?w=500',
        images: [
          'https://images.unsplash.com/photo-1564257577-1f5b5d2f7e6e?w=500',
        ],
        inStock: true,
        stockQuantity: 55,
        featured: false,
        rating: 4.6,
        reviewCount: 72,
      },
      {
        name: 'Winter Parka Jacket',
        description: 'Insulated winter parka with faux fur hood trim. Water-resistant outer shell keeps you warm and dry.',
        price: 249.99,
        category: 'Sale',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Olive', 'Navy'],
        imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
        images: [
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
        ],
        inStock: true,
        stockQuantity: 40,
        featured: true,
        rating: 4.9,
        reviewCount: 187,
      },
    ];

    await Product.insertMany(products);
    console.log('✅ Successfully seeded products');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

/**
 * Seed admin user into the database
 */
export const seedAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@novathreads.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('👤 Admin user already exists, skipping seed');
      return;
    }

    const adminUser = new User({
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Successfully created admin user');
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
  }
};

