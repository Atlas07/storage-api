const add = File => (name, password = null) => {
  const file = new File({ name });

  file.setPassword(password);

  return file
    .save();
};

module.exports = File => ({
  add: add(File),
});
