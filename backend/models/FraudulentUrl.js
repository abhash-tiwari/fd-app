const mongoose = require('mongoose');

const fraudulentUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  risk_level: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low']
  },
  detected_on: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FraudulentUrl', fraudulentUrlSchema); 