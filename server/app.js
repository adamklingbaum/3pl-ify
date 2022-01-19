const express = require('express');
const router = require('./routes');

const { json, urlencoded } = express;
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(router);

module.exports = app;
