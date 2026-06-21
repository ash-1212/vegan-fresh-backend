const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    slug: String,
    description: String,
    price: {
      type: Number,
      required: [true, 'Please provide price'],
    },
    oldPrice: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: [String],
    stock: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      enum: ['kg', 'piece', 'bunch'],
      default: 'kg',
    },
    isOrganic: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        user: mongoose.Schema.Types.ObjectId,
        rating: Number,
        review: String,
        date: Date,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);