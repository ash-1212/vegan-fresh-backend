const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const createIndexes = require('./config/indexes');
const { limiter } = require('./middleware/rateLimiter');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database & Create Indexes
connectDB();
createIndexes();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow frontend requests)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Rate Limiting
app.use('/api/', limiter);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vegan Fresh API Running!',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      users: '/api/users',
      categories: '/api/categories',
      admin: '/api/admin',
      blog: '/api/blog',
      coupons: '/api/coupons',
      payments: '/api/payments',
      upload: '/api/upload',
    }
  });
});

// All Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error', error: err.message });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Rate limiting enabled`);
  console.log(`🗄️  MongoDB indexes created`);
});