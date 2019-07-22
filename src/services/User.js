const create = User => (email, password) => {
  const user = new User({ email });

  user.setPassword(password);

  return user
    .save()
    .then(record => record)
    .catch((e) => {
      throw e.errors.email.message;
    });
};

const find = User => (email, fields = {}) => User.findOne({ email }, fields).then((record) => {
  if (record) {
    return record;
  }

  throw new Error();
});

// TODO: refactor errors
const addFile = User => (email, filename) => {
  const update = {
    $push: {
      uploads: filename,
    },
  };

  return User.findOneAndUpdate({ email }, update)
    .then((record) => {
      if (record) {
        return record;
      }

      throw new Error();
    })
    .catch((e) => {
      throw e;
    });
};

module.exports = User => ({
  create: create(User),
  find: find(User),
  addFile: addFile(User),
});
