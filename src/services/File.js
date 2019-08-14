const create = File => (name, password = null) => {
  const file = new File({ name });

  file.setPassword(password);

  return file.save();
};

const findById = File => id => (
  File.findById(id, (err, record) => {
    if (err) {
      console.log(err);
    }

    return record;
  })
);

module.exports = File => ({
  create: create(File),
  findById: findById(File),
});
