const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: 'usd',
      metadata: { orderId },
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: 'paid', orderStatus: 'processing' },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Payment successful',
        data: order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const orderId = event.data.object.metadata.orderId;
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        orderStatus: 'processing',
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};