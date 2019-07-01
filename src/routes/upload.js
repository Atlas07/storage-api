const path = require('path');
const Router = require('express-promise-router');

const { authenticate } = require('../middleware/auhenticate');
const { encryptFile } = require('../utils/crypt');
const { User, File } = require('../services');

const router = new Router();

router.use(authenticate);

router.post('/', (req, res) => {
  try {
    req.pipe(req.busboy);

    req.busboy.on('file', async (fieldname, file, filename) => {
      const fileRecord = await File.create(filename);
      const userRecord = await User.addFile(req.currentUser.email, fileRecord.id);

      const uploadPath = path.join(`./storage/${userRecord.id}`, fileRecord.id);
      const encryptStream = encryptFile(filename, uploadPath, fileRecord.passwordHash);

      encryptStream(file);
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
