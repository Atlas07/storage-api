const User = require('../models/User');
const File = require('../models/File');

const UserService = require('./User');
const FileService = require('./File');

module.exports = {
  User: UserService(User),
  File: FileService(File),
};
