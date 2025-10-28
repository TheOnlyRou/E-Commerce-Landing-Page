# NovaThreads - Smart E-Commerce Landing Page

A full-stack e-commerce platform for a fictional fashion brand "NovaThreads" built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **React + TypeScript + Vite** - Modern, fast development experience
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing with 5 main pages
- **Context API** - State management for authentication and shopping cart
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Backend
- **Node.js + Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT Authentication** - Secure user authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Request validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Key Functionalities
1. **Authentication System** - Login/Register with JWT tokens
2. **Product Catalog** - Browse, filter, and search products
3. **Product Details** - Detailed product pages with size/color selection
4. **Shopping Cart** - Add/remove items, update quantities
5. **Newsletter Subscription** - Email subscription with database storage
6. **Admin Panel** - Protected routes for product management

## 📂 Project Structure

```
nova-threads/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Auth & error handling
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   └── server.ts         # Express server
│   ├── tests/                # Backend tests
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React Context providers
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .env.example
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/TheOnlyRou/E-Commerce-Landing-Page.git
cd E-Commerce-Landing-Page
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and other settings
# Start MongoDB locally or use MongoDB Atlas

# Run the backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Run the frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/novathreads
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@novathreads.com
ADMIN_PASSWORD=Admin@123
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (Admin only)

## 🎨 Pages

1. **Home** (`/`) - Hero section, featured products, categories
2. **Products** (`/products`) - Product listing with filters and pagination
3. **Product Detail** (`/products/:id`) - Detailed product view
4. **Login** (`/login`) - User authentication
5. **Register** (`/register`) - User registration
6. **Cart** (`/cart`) - Shopping cart management

## 👤 Demo Credentials

### Admin Account
- Email: `admin@novathreads.com`
- Password: `Admin@123`

### Test User
Create your own account via the registration page!

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🏗️ Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation with express-validator
- Security headers with Helmet
- CORS configuration

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management system
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Image upload functionality
- [ ] Inventory management

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👥 Contributing

This is a demo project for showcasing full-stack development skills. Feel free to fork and modify!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ by the NovaThreads Team**

