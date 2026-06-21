const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name');
    
    const total = await Blog.countDocuments({ isPublished: true });
    
    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    blog.views += 1;
    await blog.save();
    
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, image, tags } = req.body;
    
    const blog = await Blog.create({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      content,
      excerpt,
      image,
      author: req.userId,
      tags,
      isPublished: true,
    });
    
    res.status(201).json({ success: true, message: 'Blog created', data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({ success: true, message: 'Blog updated', data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};