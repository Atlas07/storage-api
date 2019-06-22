const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueVaidator = require('mongoose-unique-validator');

const { encryptString } = require('../utils/crypt');

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
      // eslint-disable-next-line
      id: this._id,
      email: this.email,
      confirmed: this.confirmed,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  const token = this.generateJWT();
  const encryptedToken = encryptString(token, process.env.JWE_SECRET);

  return {
    email: this.email,
    confirmed: this.confirmed,
    token: encryptedToken.IV + encryptedToken.data,
  };
};

UserSchema.plugin(uniqueVaidator, { message: 'This email already taken' });

module.exports = mongoose.model('User', UserSchema);
