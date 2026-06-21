const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    aiResponse: String,
    intent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatHistory', chatHistorySchema);