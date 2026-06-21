const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createPaymentIntent,
  confirmPayment,
  handleStripeWebhook,
} = require('../controllers/paymentController');

router.post('/create-intent', authMiddleware, createPaymentIntent);
router.post('/confirm', authMiddleware, confirmPayment);
router.post('/webhook', handleStripeWebhook); // Public webhook

module.exports = router;