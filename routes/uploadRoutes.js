const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadImage, deleteImage } = require('../controllers/uploadController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'), uploadImage);
router.delete('/', authMiddleware, deleteImage);

module.exports = router;