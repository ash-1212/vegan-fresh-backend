const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  getAllUsers,
  blockUnblockUser,
  getAllOrders,
  getSalesReport,
  getLowStockProducts,
} = require('../controllers/adminController');

router.use(authMiddleware); // All admin routes need auth

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/block', blockUnblockUser);
router.get('/orders', getAllOrders);
router.get('/sales-report', getSalesReport);
router.get('/low-stock', getLowStockProducts);

module.exports = router;