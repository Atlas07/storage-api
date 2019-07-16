const zlib = require('zlib');

const createGzipStream = () => {
  const gzip = zlib.createGzip();

  return gzip;
};

module.exports = {
  createGzipStream,
};
