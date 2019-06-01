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

module.exports = User => ({
  create: create(User),
});
