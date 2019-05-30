const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const constants = require('./constants');
const mountRoutes = require('./routes');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
mountRoutes(app);

mongoose
  .connect('mongodb://db:27017/banking', { useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(e => console.log(e));

app.listen(constants.SERVER_PORT, () => {
  console.log(`Running on ${constants.SERVER_PORT}`);
});
