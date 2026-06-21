const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: String,
    content: String,
    excerpt: String,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);