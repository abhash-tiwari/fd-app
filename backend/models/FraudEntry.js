const mongoose = require('mongoose');

const fraudEntrySchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['app', 'url'],
    },
    name: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    detectedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    threatLevel: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
    },
    status: {
      type: String,
      required: true,
      enum: ['detected', 'reported', 'blocked', 'investigating'],
      default: 'detected',
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FraudEntry = mongoose.model('FraudEntry', fraudEntrySchema);

module.exports = FraudEntry;