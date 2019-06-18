const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const AppendInitVect = require('./AppendInitVect');

const CIPHER_ALGORITHM = 'aes256';

const getCipherKey = password => crypto
  .createHash('sha256')
  .update(password)
  .digest();

const encrypt = (filePath, password) => {
  const initVect = crypto.randomBytes(16);

  const readStream = fs.createReadStream(filePath);
  const gzip = zlib.createGzip();
  const writeStream = fs.createWriteStream(path.join(`${filePath}.e`));

  const cipherKey = getCipherKey(password);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, cipherKey, initVect);
  const appendInitVect = new AppendInitVect(initVect);

  readStream
    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream);
};

const decrypt = (filePath, password) => {
  const readInitVect = fs.createReadStream(filePath, { end: 15 });
  let initVect;

  readInitVect.on('data', (chunk) => {
    initVect = chunk;
  });

  readInitVect.on('close', () => {
    const readStream = fs.createReadStream(filePath, { start: 16 });
    const writeStream = fs.createWriteStream(`${filePath}.d`);

    const cipherKey = getCipherKey(password);
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, cipherKey, initVect);

    const unzip = zlib.createGunzip();

    readStream
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
  });
};

module.exports = {
  encrypt,
  decrypt,
};
