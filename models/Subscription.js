const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['weekly', 'biweekly'],
      default: 'weekly',
    },
    boxType: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    vegetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    deliveryDay: String,
    price: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
    nextDelivery: Date,
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);