const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name'],
      unique: true,
      enum: ['Tomato', 'Potato', 'Onion', 'Cabbage', 'Chili', 'Pumpkin'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);