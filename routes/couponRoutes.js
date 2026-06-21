const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getAllCoupons,
  validateCoupon,
  createCoupon,
  deleteCoupon,
} = require('../controllers/couponController');

// Public
router.get('/', getAllCoupons);
router.post('/validate', validateCoupon);

// Admin
router.post('/', authMiddleware, createCoupon);
router.delete('/:id', authMiddleware, deleteCoupon);

module.exports = router;