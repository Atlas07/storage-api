const path = require('path');
const Router = require('express-promise-router');

const { authenticate } = require('../middleware/auhenticate');
const { encrypt } = require('../utils/crypt');
const { User, File } = require('../services');

const router = new Router();

router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    const fileRecord = await File.create('text.txt');
    const userRecord = await User.addFile(req.currentUser.email, fileRecord.id);

    req.pipe(req.busboy);

    req.busboy.on('file', (fieldname, file, filename) => {
      const uploadPath = path.join(`./storage/${userRecord.id}`, fileRecord.id);
      const test = encrypt(filename, uploadPath, 'haha_Test');
      test(file);
    });

    req.busboy.on('finish', () => {
      res.json({ uploaded: true });
    });
  } catch (err) {
    if (err && !err.code === 'EEXIST') {
      res.status(400).json({ error: err });
    }
  }
});

module.exports = router;
