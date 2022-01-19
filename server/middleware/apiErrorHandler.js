// Methodology adapted from https://github.com/productioncoder/express-error-handling
const ApiError = require('../ApiError');

const apiErrorHandler = (err, req, res) => {
  if (err instanceof ApiError) {
    return res.status(err.code).send(err.message);
  }
  res.sendStatus(500);
};

module.exports = apiErrorHandler;
