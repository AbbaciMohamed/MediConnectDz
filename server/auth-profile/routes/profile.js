const express = require('express');
const { getProfile, updateProfile, generateShareKey, accessWithKey } = require('../controllers/profileController');
const auth = require('../../shared/middleware/auth');
const router = express.Router();

router.get('/:userId', auth, getProfile);
router.put('/:userId', auth, updateProfile);
router.post('/:userId/share-key', auth, generateShareKey);
router.post('/access-with-key', auth, accessWithKey);

module.exports = router; 