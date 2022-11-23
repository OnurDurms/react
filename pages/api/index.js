'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('./database/connection').connect();
const auth = require("./middleware/auth");
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require("./routes/user")(router, auth));
app.use('/api', require("./routes/task")(router, auth));

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});

module.exports = app;
