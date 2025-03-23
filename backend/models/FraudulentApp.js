const mongoose = require('mongoose');

const fraudulentAppSchema = new mongoose.Schema({
  app_name: {
    type: String,
    required: true,
    trim: true
  },
  developer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  risk_level: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low']
  },
  reported_on: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FraudulentApp', fraudulentAppSchema); 