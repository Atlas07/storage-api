const jwt = require('jsonwebtoken');
const { decryptString } = require('../utils/crypt');
const { User } = require('../services');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  let encryptedTokenStr;

  if (header) {
    // eslint-disable-next-line
    encryptedTokenStr = header.split(' ')[1];
  }

  if (!encryptedTokenStr) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const encryptedToken = {
    IV: encryptedTokenStr.slice(0, 32),
    data: encryptedTokenStr.slice(32),
  };

  const token = decryptString(encryptedToken, process.env.JWE_SECRET);

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
