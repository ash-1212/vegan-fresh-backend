const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getIO } = require('../config/socket');
const Order = require('../models/Order');

// Trigger order status update via Socket.io
router.put('/:orderId/socket-status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: status },
      { new: true }
    );

    // Emit to user via Socket.io
    const io = getIO();
    io.to(`user-${order.user}`).emit('order-updated', {
      orderId: order._id,
      orderStatus: status,
      message: `Your order status changed to ${status}`,
      timestamp: new Date(),
    });

    res.status(200).json({
      success: true,
      message: 'Order updated and notification sent',
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;