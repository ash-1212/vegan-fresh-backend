const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    
    const category = await Category.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      image,
      description,
    });
    
    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({ success: true, message: 'Category updated', data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};