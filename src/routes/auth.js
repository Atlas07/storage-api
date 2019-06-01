const Router = require('express-promise-router');

const { isValidEmail, isValidPassword } = require('../utils/validation');
const { User } = require('../services');

const router = new Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    const user = await User.create(email, password);
    res.json({ user });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
