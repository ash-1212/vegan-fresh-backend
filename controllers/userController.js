const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, address },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({ success: true, message: 'Profile updated', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { street, city, state, zip, country } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { address: { street, city, state, zip, country } },
      { new: true }
    );
    
    res.status(200).json({ success: true, message: 'Address added', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.userId);
    
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ success: false, message: 'Already in favorites' });
    }
    
    user.favorites.push(productId);
    await user.save();
    
    res.status(200).json({ success: true, message: 'Added to favorites', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { favorites: productId } },
      { new: true }
    );
    
    res.status(200).json({ success: true, message: 'Removed from favorites', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.status(200).json({ success: true, data: user.favorites });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};