const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [
      {
        product: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cod'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    subtotal: Number,
    tax: Number,
    deliveryFee: Number,
    totalAmount: Number,
    coupon: String,
    discount: {
      type: Number,
      default: 0,
    },
    tracking: {
      estimatedDelivery: Date,
      currentLocation: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);