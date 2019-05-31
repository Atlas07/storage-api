const Router = require('express-promise-router');

const { isValidEmail, isValidPassword } = require('../utils/validation');
const User = require('../models/User');

const router = new Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const user = new User({ email });

  user.setPassword(password);
  user
    .save()
    .then(record => res.json({ user: record.toAuthJson() }))
    .catch(e => res.status(400).json(e));
});

module.exports = router;
