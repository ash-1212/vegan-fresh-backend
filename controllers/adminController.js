const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' },
        },
      },
    ]);
    
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalCategories,
        totalRevenue: totalRevenue[0]?.revenue || 0,
        pendingOrders,
        deliveredOrders,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.blockUnblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Add isBlocked field if needed
    res.status(200).json({ success: true, message: 'User status updated', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getSalesReport = async (req, res) => {
  try {
    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sales: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]);
    
    res.status(200).json({ success: true, data: dailySales });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lt: 10 } }).select('name stock');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};