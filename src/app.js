const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const constants = require('./constants');
const mountRoutes = require('./routes');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
mountRoutes(app);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connected'))
  .catch(e => console.log(e));

app.listen(constants.SERVER_PORT, () => {
  console.log(`Running on ${constants.SERVER_PORT}`);
});
