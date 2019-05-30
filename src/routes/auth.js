const Router = require('express-promise-router');
const validator = require('validator');

const User = require('../models/User');

const router = new Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = validator.isEmail(email);

  if (!isValidEmail) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // at least one digit
  // at least one lower case
  // at least one upper case
  // at least one special symbol
  // at least 8 characters
  const passwordRegexp = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_`?*])(?=.{8,})',
  );

  if (!password.match(passwordRegexp)) {
    return res.status(400).json({
      error: 'Invalid credentials',
    });
  }

  const user = new User();

  user.setPassword(password);
  user
    .save()
    .then(record => res.json({ user: record.toAuthJson() }))
    .catch(e => res.status(400).json(e));
});

module.exports = router;
