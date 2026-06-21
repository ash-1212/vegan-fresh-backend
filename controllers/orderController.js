const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('../utils/emailService');

const generateOrderNumber = () => {
  return 'ORD-' + Date.now();
};

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    
    const order = await Order.create({
      user: req.userId,
      orderNumber: generateOrderNumber(),
      items: cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount: cart.totalPrice,
      subtotal: cart.totalPrice,
      tax: Math.round(cart.totalPrice * 0.1),
      deliveryFee: 50,
    });
    
    // Clear cart
    await Cart.findOneAndUpdate({ user: req.userId }, { items: [], totalPrice: 0 });
    
    // Send confirmation email
    const user = await User.findById(req.userId);
    await sendOrderConfirmation(user.email, order);
    
    res.status(201).json({ success: true, message: 'Order created', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    ).populate('user');
    
    // Send email update
    const { sendOrderStatusUpdate } = require('../utils/emailService');
    await sendOrderStatusUpdate(order.user.email, status, order.orderNumber);
    
    res.status(200).json({ success: true, message: 'Order updated', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (order.orderStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'Cannot cancel shipped order' });
    }
    
    order.orderStatus = 'cancelled';
    await order.save();
    
    res.status(200).json({ success: true, message: 'Order cancelled', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};