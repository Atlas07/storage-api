const crypto = require('crypto');
const fs = require('fs');

const AppendInitVect = require('./AppendInitVect');

const CIPHER_ALGORITHM = 'aes256';

const getCipherKey = password => crypto
  .createHash('sha256')
  .update(password)
  .digest();

const streamToString = (stream) => {
  const chunks = [];

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

const createEncryptStream = (password) => {
  const initVect = crypto.randomBytes(16);

  const cipherKey = getCipherKey(password);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, cipherKey, initVect);
  const appendInitVect = new AppendInitVect(initVect);

  return {
    cipher,
    appendInitVect,
  };
};

const createDecryptStream = async (filePath, password) => {
  const IVStream = fs.createReadStream(filePath, { end: 15 });
  const initVect = await streamToString(IVStream);

  const cipherKey = getCipherKey(password);
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, cipherKey, initVect);

  return decipher;
};

const encryptString = (text, password) => {
  if (!text || !password) {
    return Error('Missed fields');
  }

  if (typeof text !== 'string' || typeof password !== 'string') {
    return new Error('text and password should be strings');
  }

  const key = getCipherKey(password);
  const IV = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, IV);
  const encrypted = cipher.update(text, 'utf8', 'base64');

  return {
    IV: IV.toString('hex'),
    data: encrypted + cipher.final('base64'),
  };
};

const decryptString = (encrypted, password) => {
  if (!encrypted || !encrypted.data || !encrypted.IV) {
    return new Error('Missed fields. Encrypted should contain data and IV fields');
  }

  if (typeof encrypted.data !== 'string' || typeof encrypted.IV !== 'string') {
    return new Error('Data and IV should be strings');
  }

  if (!password) {
    return new Error('Missed password');
  }

  const { data, IV } = encrypted;

  const key = getCipherKey(password);

  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, Buffer.from(IV, 'hex'));
  const decrypted = decipher.update(data, 'base64', 'utf8');

  return decrypted + decipher.final('utf8');
};

module.exports = {
  createEncryptStream,
  createDecryptStream,
  encryptString,
  decryptString,
  getCipherKey,
};
