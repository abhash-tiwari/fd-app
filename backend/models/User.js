const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password_hashed: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Analyst', 'User']
  }
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hashed);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hashed')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password_hashed = await bcrypt.hash(this.password_hashed, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;