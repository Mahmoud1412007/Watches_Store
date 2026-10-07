const express = require('express');
const router = express.Router();
const { getAllWatches, getWatchById } = require('../controllers/watchController');

// تعريف المسارات
router.get('/', getAllWatches);
router.get('/:id', getWatchById);

module.exports = router;