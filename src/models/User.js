const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
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
  // TODO
  // Get salt from safety place
  this.passwordHash = bcrypt.hashSync(password, 'So1meSA_lt_is09HEre%<');
};

module.exports = mongoose.model('User', UserSchema);
