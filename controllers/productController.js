const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    
    let filter = { isAvailable: true };
    
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) filter.category = cat._id;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .populate('category')
      .limit(limit)
      .skip(skip);
    
    const total = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, unit, isOrganic } = req.body;
    
    const product = await Product.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description,
      price,
      category,
      stock,
      unit,
      isOrganic,
    });
    
    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({ success: true, message: 'Product updated', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};