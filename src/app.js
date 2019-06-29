const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const busboy = require('connect-busboy');

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
app.use(busboy({
  highWaterMark: 4 * 1024 * 1024, // 4 MiB buffer
}));

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
