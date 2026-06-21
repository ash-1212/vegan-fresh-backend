const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [], totalPrice: 0 });
    }
    
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [] });
    }
    
    const itemExists = cart.items.find((item) => item.product.toString() === productId);
    
    if (itemExists) {
      itemExists.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    
    // Calculate total
    cart.totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      cart.totalPrice += prod.price * item.quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.status(200).json({ success: true, message: 'Item added to cart', data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ user: req.userId });
    
    const item = cart.items.find((i) => i._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    item.quantity = quantity;
    
    cart.totalPrice = 0;
    for (let cartItem of cart.items) {
      const prod = await Product.findById(cartItem.product);
      cart.totalPrice += prod.price * cartItem.quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.status(200).json({ success: true, message: 'Cart updated', data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ user: req.userId });
    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    
    cart.totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      cart.totalPrice += prod.price * item.quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.status(200).json({ success: true, message: 'Item removed', data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.userId }, { items: [], totalPrice: 0 });
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};