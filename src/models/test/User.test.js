// const mongoose = require('mongoose');

// mongoose
//   .connect('mongodb://db:27017/storage-test', { useNewUrlParser: true })
//   .then(() => console.log('db-test connected'))
//   .catch(e => console.log(e));

const User = require('../User');

describe('User model test', () => {
  // beforeAll(async () => {
  //   await User.remove({});
  // });

  // afterEach(async () => {
  //   await User.remove({});
  // });

  // afterAll(async () => {
  //   await mongoose.connection.close();
  // });

  it('has a module', () => {
    expect(User).toBeDefined();
  });
});
