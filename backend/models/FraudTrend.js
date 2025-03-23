const mongoose = require('mongoose');

const fraudTrendSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  fraud_cases_detected: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FraudTrend', fraudTrendSchema); 