const register = require('./register');
const login = require('./login');
const upload = require('./upload');
const download = require('./download');

module.exports = (app) => {
  app.use('/register', register);
  app.use('/login', login);
  app.use('/upload', upload);
  app.use('/download', download);
};
