const Router = require('express-promise-router');

const { authenticate } = require('../middleware/auhenticate');
const { File } = require('../services');
const { createDownloadFileStream } = require('../utils/download');

const router = new Router();

router.use(authenticate);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = `./storage/${req.currentUser.id}/${id}`;
    const isFileExists = req.currentUser.uploads.includes(id);

    if (!isFileExists) {
      res.status(400).json({
        error: 'File does not exist',
      });

      return;
    }

    const fileRecord = await File.findById(id);

    await createDownloadFileStream(filePath, fileRecord.passwordHash, res);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
