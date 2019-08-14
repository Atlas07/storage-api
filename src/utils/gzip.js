const zlib = require('zlib');

const createGzipStream = () => {
  const gzip = zlib.createGzip();

  return gzip;
};

const createGunzipStream = () => {
  const gunzip = zlib.createGunzip();

  return gunzip;
};

module.exports = {
  createGzipStream,
  createGunzipStream,
};
