const path = require('path');
const Router = require('express-promise-router');

const { authenticate } = require('../middleware/auhenticate');
const { createSaveFileStream } = require('../utils/upload');
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
      const saveFileStream = createSaveFileStream(filename, uploadPath, fileRecord.passwordHash);

      saveFileStream(file);
    });

    req.busboy.on('finish', () => {
      res.json({ uploaded: true });
    });
  } catch (err) {
    if (err && err.code !== 'EEXIST') {
      res.status(400).json({ error: err });
    }
  }
});

module.exports = router;
