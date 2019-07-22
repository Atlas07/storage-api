const create = File => (name, password = null) => {
  const file = new File({ name });

  file.setPassword(password);

  return file.save();
};

module.exports = File => ({
  create: create(File),
});
