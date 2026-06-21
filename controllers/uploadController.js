const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      { folder: 'vegan-fresh' }
    );

    res.status(200).json({
      success: true,
      message: 'Image uploaded',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};