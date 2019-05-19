const express = require('express');
const mongoose = require('mongoose');

const constants = require('./constants');

const app = express();

mongoose
  .connect('mongodb://db:27017/banking', { useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(e => console.log(e));

app.listen(constants.SERVER_PORT, () => {
  console.log(`Running on ${constants.SERVER_PORT}`);
});
