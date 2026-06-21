const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    oldStock: Number,
    newStock: Number,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reason: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);