const express = require('express');

const { json, urlencoded } = express;
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

module.exports = app;
