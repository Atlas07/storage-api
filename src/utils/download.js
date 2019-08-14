const fs = require('fs');
const util = require('util');
const stream = require('stream');

const { createDecryptStream } = require('./crypt');
const { createGunzipStream } = require('./gzip');

const pipeline = util.promisify(stream.pipeline);

const createDownloadFileStream = async (filePath, password, writeStream) => {
  try {
    const fileStream = fs.createReadStream(filePath, { start: 16 });
    const gunzipStream = createGunzipStream();
    const decryptStream = await createDecryptStream(filePath, password);

    await pipeline(
      fileStream,
      decryptStream,
      gunzipStream,
      writeStream,
    );
  } catch (error) {
    console.log(error);
    throw new Error('Download has failed');
  }
};

module.exports = {
  createDownloadFileStream,
};
