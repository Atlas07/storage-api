const path = require('path');
const fs = require('fs');
const Router = require('express-promise-router');
const { promisify } = require('util');

const { authenticate } = require('../middleware/auhenticate');
const { encrypt } = require('../utils/crypt');
const { User, File } = require('../services');

const router = new Router();

router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    const { _id, email } = req.currentUser;
    const fileRecord = await File.create('text.txt');

    await User.addFile(email, fileRecord.id);

    const uploadDir = path.resolve(`./storage/${_id}`);
    const createDirAsync = promisify(fs.mkdir);

    await createDirAsync(uploadDir);

    req.pipe(req.busboy);

    req.busboy.on('file', (fieldname, file, filename) => {
      const uploadPath = path.join(uploadDir, filename);
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
