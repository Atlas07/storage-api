const create = User => (email, password) => {
  const user = new User({ email });

  user.setPassword(password);
  return user
    .save()
    .then(record => record.toAuthJSON())
    .catch((e) => {
      throw e.errors.email.message;
    });
};

const find = User => (email, password) => (
  User.findOne({ email }).then((record) => {
    if (record && record.isValidPassword(password)) {
      return record.toAuthJSON();
    }

    throw new Error();
  })
);

module.exports = User => ({
  create: create(User),
  find: find(User),
});
