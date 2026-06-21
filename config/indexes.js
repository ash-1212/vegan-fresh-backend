const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const ChatHistory = require('../models/ChatHistory');
const Notification = require('../models/Notification');

const createIndexes = async () => {
  try {
    // Product indexes
    await Product.collection.createIndex({ name: 'text', description: 'text' }).catch(() => {});
    await Product.collection.createIndex({ category: 1 }).catch(() => {});
    await Product.collection.createIndex({ price: 1 }).catch(() => {});
    await Product.collection.createIndex({ isAvailable: 1 }).catch(() => {});
    
    // Order indexes
    await Order.collection.createIndex({ user: 1 }).catch(() => {});
    await Order.collection.createIndex({ orderStatus: 1 }).catch(() => {});
    await Order.collection.createIndex({ createdAt: -1 }).catch(() => {});
    
    // Category indexes
    await Category.collection.createIndex({ slug: 1 }).catch(() => {});
    
    // Chat history indexes
    await ChatHistory.collection.createIndex({ user: 1, createdAt: -1 }).catch(() => {});
    
    // Notification indexes
    await Notification.collection.createIndex({ user: 1, isRead: 1 }).catch(() => {});
    await Notification.collection.createIndex({ createdAt: -1 }).catch(() => {});
    
    console.log('✅ MongoDB indexes created (duplicates ignored)');
  } catch (error) {
    console.error('Index error:', error.message);
  }
};

module.exports = createIndexes;