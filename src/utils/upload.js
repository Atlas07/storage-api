const fs = require('fs');
const util = require('util');
const stream = require('stream');

const { createEncryptStream } = require('./crypt');
const { createGzipStream } = require('./gzip');

const pipeline = util.promisify(stream.pipeline);

const createSaveFileStream = (filename, filePath, password) => async (fileStream) => {
  try {
    const gzipStream = createGzipStream();
    const encryptStream = createEncryptStream(password);
    const writeStream = fs.createWriteStream(filePath);

    await pipeline(
      fileStream,
      gzipStream,
      encryptStream.cipher,
      encryptStream.appendInitVect,
      writeStream,
    );

    console.log(`Upload of ${filename} has finished`);
  } catch (err) {
    console.error(`Upload of ${filename} has failed`);
    throw new Error('Upload has failed');
  }
};

module.exports = {
  createSaveFileStream,
};
