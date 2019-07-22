const Router = require('express-promise-router');

const { isValidEmail, isValidPassword } = require('../utils/validation');
const { User } = require('../services');

const router = new Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    const user = await User.find(email);

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
