const register = require('./register');
const login = require('./login');

module.exports = (app) => {
  app.use('/register', register);
  app.use('/login', login);
};
