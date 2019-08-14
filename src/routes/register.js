const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
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
    const user = await User.create(email, password);

    const uploadDir = path.resolve(`./storage/${user.id}`);
    const createDirAsync = promisify(fs.mkdir);

    await createDirAsync(uploadDir);

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
