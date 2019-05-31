const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: String, default: '' },
  registrationDate: { type: Date, required: true, default: Date.now },
});

UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.setPassword = function setPassword(password) {
  // bcrypt.hashSync(password, 'salt')
  this.passwordHash = bcrypt.hashSync(password, '$2a$11$xa3duPWd7keIhu7rF50g2z');
};

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
    confirmed: this.confirmed,
  }, '$2a$11$xa3duPWd7keIhu7rF50g2z');
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);
