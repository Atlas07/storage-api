const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const createRandomString = (length = 16) => crypto.randomBytes(length).toString('hex');

const createPassword = (password = false) => (
  bcrypt.hashSync(
    password || createRandomString(),
    process.env.FILE_SECRET,
  )
);

module.exports = {
  createPassword,
  createRandomString,
};
