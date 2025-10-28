# NovaThreads E-Commerce Platform - Project Summary

## 📋 Overview

This repository contains a complete full-stack e-commerce platform built for benchmarking AI code review tools. The project demonstrates realistic development workflows including feature branches, bug fixes, and pull requests.

## 🎯 Project Purpose

This repository is designed to:
- Serve as a realistic codebase for testing AI code review tools
- Demonstrate best practices in full-stack development
- Provide meaningful pull requests for analysis
- Showcase proper Git workflow and commit conventions

## 🏗️ Architecture

### Backend (Node.js + Express + TypeScript)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Validation**: express-validator for request validation
- **Security**: Helmet for security headers, CORS configuration
- **API Design**: RESTful endpoints with proper HTTP methods

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development
- **Routing**: React Router DOM v6
- **State Management**: React Context API (AuthContext, CartContext)
- **Styling**: Tailwind CSS with custom theme
- **HTTP Client**: Axios with interceptors
- **UI Feedback**: react-hot-toast for notifications

## 📁 Project Structure

```
E-Commerce-Landing-Page/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers (auth, products, newsletter)
│   │   ├── middleware/        # Auth & error handling middleware
│   │   ├── models/            # MongoDB schemas (User, Product, Newsletter)
│   │   ├── routes/            # API route definitions
│   │   ├── utils/             # Helper functions (database, JWT, seed data, validation)
│   │   └── server.ts          # Express server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React Context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components (Home, Products, Cart, etc.)
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx            # Main app component with routing
│   │   └── main.tsx           # React entry point
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
├── README.md
└── PROJECT_SUMMARY.md
```

## ✨ Key Features

### 1. Authentication System
- User registration with validation
- Login with JWT token generation
- Protected routes and endpoints
- Password hashing with bcrypt
- Token-based session management

### 2. Product Catalog
- Product listing with pagination
- Category filtering (Men, Women, Accessories, Shoes, Sale)
- Search functionality
- Product detail pages
- Featured products section
- Admin CRUD operations

### 3. Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation
- Floating point precision handling

### 4. Newsletter Subscription
- Email subscription with validation
- Database storage
- Unsubscribe functionality
- Admin view of subscribers

### 5. Admin Panel
- Protected admin routes
- Product management (Create, Read, Update, Delete)
- Newsletter subscriber management

## 🔄 Git Workflow & Commits

### Commit History

1. **Initial Commit**: Project structure initialization
2. **Feature Branch**: `feature/add-product-search-functionality`
   - Added search bar to navbar
   - Created useProducts custom hook
3. **Bug Fix Branch**: `bugfix/fix-cart-total-calculation`
   - Fixed floating point precision issues
4. **Feature Branch**: `feature/add-env-validation` (Open PR)
   - Added environment variable validation

### Pull Request

**PR #1**: "feat: Add environment variable validation on server startup"
- **Status**: Open
- **Purpose**: Demonstrates a realistic feature addition for code review benchmarking
- **Changes**: 
  - Environment validation utility
  - Server startup validation
  - Security warnings for production
  - Clear error messages

## 🧪 Testing Scenarios

This repository is ideal for testing:
- Code review accuracy on feature additions
- Bug fix detection and analysis
- Security vulnerability identification
- Code quality assessment
- Best practices validation
- TypeScript type safety analysis

## 📊 Code Statistics

- **Total Files**: 51
- **Backend Files**: 21
- **Frontend Files**: 30
- **Lines of Code**: ~4,300+
- **Languages**: TypeScript, JavaScript, CSS
- **Commits**: 7 meaningful commits
- **Branches**: 4 (main + 3 feature/bugfix branches)
- **Pull Requests**: 1 open PR

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Protected API routes with middleware
- Input validation on all endpoints
- Security headers with Helmet
- CORS configuration
- Environment variable validation
- XSS protection through React

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/TheOnlyRou/E-Commerce-Landing-Page.git
cd E-Commerce-Landing-Page
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `GET /api/newsletter/subscribers` - Get subscribers (Admin)

## 🎨 Frontend Pages

1. **Home** (`/`) - Hero, featured products, categories
2. **Products** (`/products`) - Product listing with filters
3. **Product Detail** (`/products/:id`) - Detailed product view
4. **Login** (`/login`) - User authentication
5. **Register** (`/register`) - User registration
6. **Cart** (`/cart`) - Shopping cart management

## 🔧 Technologies Used

### Backend
- express (^4.18.2)
- mongoose (^8.0.0)
- jsonwebtoken (^9.0.2)
- bcryptjs (^2.4.3)
- express-validator (^7.0.1)
- helmet (^7.1.0)
- cors (^2.8.5)
- morgan (^1.10.0)
- compression (^1.7.4)

### Frontend
- react (^18.2.0)
- react-router-dom (^6.20.0)
- axios (^1.6.2)
- react-hot-toast (^2.4.1)
- lucide-react (^0.294.0)
- tailwindcss (^3.3.6)

## 📈 Future Enhancements

- Payment integration (Stripe/PayPal)
- Order management system
- User profile management
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Image upload functionality
- Advanced analytics dashboard

## 👥 Contributing

This is a demo project for benchmarking purposes. Feel free to fork and use for testing AI code review tools!

## 📄 License

MIT License

---

**Built for AI Code Review Benchmarking**

