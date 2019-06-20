const jwt = require('jsonwebtoken');
const { User } = require('../services');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) {
    // eslint-disable-next-line
    token = header.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    User.find(decoded.email).then((user) => {
      req.currentUser = user;
      next();
    });
  });
};

module.exports = {
  authenticate,
};
