const User = require('../models/User');

const UserService = require('./User');

module.exports = {
  User: UserService(User),
};
