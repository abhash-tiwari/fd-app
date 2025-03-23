const express = require('express');
const {
  getFraudEntries,
  get30DayTrend,
  getFraudEntryById,
  updateFraudStatus,
} = require('../controllers/fraudController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getFraudEntries);
router.route('/trend').get(protect, get30DayTrend);
router.route('/:id').get(protect, getFraudEntryById).put(protect, updateFraudStatus);

module.exports = router;