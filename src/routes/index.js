const register = require('./register');
const login = require('./login');
const upload = require('./upload');

module.exports = (app) => {
  app.use('/register', register);
  app.use('/login', login);
  app.use('/upload', upload);
};
