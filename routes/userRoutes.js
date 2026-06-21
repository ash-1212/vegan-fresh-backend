const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  addAddress,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require('../controllers/userController');

router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/address', addAddress);
router.post('/favorites/:productId', addToFavorites);
router.delete('/favorites/:productId', removeFromFavorites);
router.get('/favorites', getFavorites);

module.exports = router;