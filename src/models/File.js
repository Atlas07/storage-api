const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  needsCustomPassword: {
    type: Boolean,
    default: false,
  },
  // type: {
  //   type: String,
  //   required: true,
  // },
  // typeGroup: {
  //   type: String,
  //   required: true,
  // },
  // size: {
  //   type: Number,
  //   required: true,
  // },
});

FileSchema.methods.setPassword = function setPassword(password = null) {
  if (password) {
    this.needsCustomPassword = true;
  }

  this.passwordHash = bcrypt.hashSync(
    password || crypto.randomBytes(16).toString('hex'),
    process.env.FILE_SECRET,
  );
};

module.exports = mongoose.model('File', FileSchema);
