const path = require('path');
const Router = require('express-promise-router');

const { encrypt } = require('../utils/crypt');

const router = new Router();

router.post('/', async (req, res) => {
  encrypt(path.join(__dirname, 'test.txt'), 'someTimes_TheSame_9');
  // decrypt(path.join(__dirname, 'test.txt.e'), 'someTimes_TheSame_9');
  res.json({});
});

module.exports = router;
