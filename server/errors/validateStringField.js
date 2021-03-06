const ApiError = require('../middleware');

const validateStringField = (fieldName, value) => {
  if (value === undefined) {
    return ApiError.badRequest(`${fieldName} is required`);
  }

  if (typeof value !== 'string') {
    return ApiError.badRequest(`${fieldName} must be a string`);
  }

  if (value.length === 0) {
    return ApiError.badRequest(`${fieldName} must not be empty`);
  }

  return null;
};

module.exports = validateStringField;
