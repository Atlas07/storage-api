const { Transform } = require('stream');

class AppendInitVect extends Transform {
  constructor(initVect, options) {
    super(options);

    this.initVect = initVect;
    this.isAppended = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.isAppended) {
      this.push(this.initVect);
      this.isAppended = true;
    }

    this.push(chunk);
    cb();
  }
}

module.exports = AppendInitVect;
