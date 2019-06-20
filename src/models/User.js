const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueVaidator = require('mongoose-unique-validator');

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
  uploads: [
    {
      type: String,
      required: true,
    },
  ],
});

UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, process.env.JWT_SECRET);
};

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed,
      passHash: this.passwordHash,
    },
    process.env.JWT_SECRET,
  );
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

UserSchema.plugin(uniqueVaidator, { message: 'This email already taken' });

module.exports = mongoose.model('User', UserSchema);
