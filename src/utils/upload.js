const fs = require('fs');

const { createEncryptStream } = require('./crypt');
const { createGzipStream } = require('./gzip');

const createSaveFileStream = (filename, filePath, password) => (file) => {
  const gzipStream = createGzipStream();
  const encryptStream = createEncryptStream(password);
  const writeStream = fs.createWriteStream(filePath);

  file
    .pipe(gzipStream)
    .pipe(encryptStream.cipher)
    .pipe(encryptStream.appendInitVect)
    .pipe(writeStream);

  writeStream.on('close', () => {
    console.log(`Upload of ${filename} has finished`);
  });
};

module.exports = {
  createSaveFileStream,
};
