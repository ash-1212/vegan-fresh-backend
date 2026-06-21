const Coupon = require('../models/Coupon');

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    
    const coupon = await Coupon.findOne({ code, isActive: true });
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ success: false, message: 'Coupon expired' });
    }
    
    if (orderTotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ${coupon.minOrder}`,
      });
    }
    
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderTotal * coupon.discountValue) / 100;
      discount = Math.min(discount, coupon.maxDiscount);
    } else {
      discount = coupon.discountValue;
    }
    
    coupon.usedCount += 1;
    await coupon.save();
    
    res.status(200).json({
      success: true,
      message: 'Coupon valid',
      data: { discount, couponCode: code },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrder, maxDiscount, expiryDate } = req.body;
    
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrder,
      maxDiscount,
      expiryDate,
    });
    
    res.status(201).json({ success: true, message: 'Coupon created', data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};