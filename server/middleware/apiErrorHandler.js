// Methodology adapted from https://github.com/productioncoder/express-error-handling
const ApiError = require('./ApiError');

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).send(err.message);
    return;
  }
  res.sendStatus(500);
  console.error(err);
};

module.exports = apiErrorHandler;
