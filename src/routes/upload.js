const path = require('path');
const Router = require('express-promise-router');

const { authenticate } = require('../middleware/auhenticate');
const { createSaveFileStream } = require('../utils/upload');
const { User, File } = require('../services');

const router = new Router();

router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    req.pipe(req.busboy);

    req.busboy.on('file', async (fieldname, file, filename) => {
      try {
        const fileRecord = await File.create(filename);
        const userRecord = await User.addFile(req.currentUser.email, fileRecord.id);

        const uploadPath = path.join(`./storage/${userRecord.id}`, fileRecord.id);
        const saveFileStream = createSaveFileStream(filename, uploadPath, fileRecord.passwordHash);

        await saveFileStream(file);
      } catch (error) {
        // TODO: generate error response
        // TODO: move to better place (from controller)
        res.status(400).json({
          error: {
            message: error.message,
            filename,
          },
        });
      }
    });

    req.busboy.on('finish', () => {
      res.json({ uploaded: true });
    });

    req.busboy.on('error', (err) => {
      console.log('err', err);
    });
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ error: 'Upload has failed' });
  }
});

module.exports = router;
