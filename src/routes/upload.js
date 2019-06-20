const Router = require('express-promise-router');

const { User, File } = require('../services');

const router = new Router();

router.post('/', async (req, res) => {
  const email = 'bar@gmail.com';

  // encrypt(path.join(__dirname, 'test.txt'), 'someTimes_TheSame_9');
  // decrypt(path.join(__dirname, 'test.txt.e'), 'someTimes_TheSame_9');

  try {
    const file = await File.add('text.txt');
    await User.addFile(email, file.id);

    res.json({ uploaded: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
