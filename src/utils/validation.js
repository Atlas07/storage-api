
const validator = require('validator');

const isValidPassword = (password) => {
  if (typeof password !== 'string') {
    return false;
  }
  // at least one digit
  // at least one lower case
  // at least one upper case
  // at least one special symbol
  // at least 8 characters
  const passwordRegexp = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_`?*])(?=.{8,})',
  );

  return !!password.match(passwordRegexp);
};

const isValidEmail = email => validator.isEmail(email);

module.exports = {
  isValidPassword,
  isValidEmail,
};
