const { Item } = require('../models');
const ApiError = require('../middleware');
const validateStringField = require('./validateStringField');

const validateMinStock = (minStock) => {
  if (minStock === undefined) {
    return ApiError.badRequest('minStock is required');
  }

  if (typeof minStock !== 'number') {
    return ApiError.badRequest('minStock must be an integer');
  }

  if (minStock < 0) {
    return ApiError.badRequest('minStock must be at least 0');
  }

  return null;
};

const validateItemFields = (name, minStock, vendorName) => {
  const nameError = validateStringField('name', name);
  if (nameError) {
    return nameError;
  }

  const minStockError = validateMinStock(minStock);
  if (minStockError) {
    return minStockError;
  }

  const vendorNameError = validateStringField('vendorName', vendorName);
  if (vendorNameError) {
    return vendorNameError;
  }

  return null;
};

module.exports.createItem = (name, minStock, vendorName) => {
  const fieldValidationError = validateItemFields(name, minStock, vendorName);
  return fieldValidationError;
};

module.exports.getAllItems = () => null;

module.exports.getItemById = () => null;

module.exports.updateItemById = async (itemId, name, minStock, vendorName) => {
  const fieldValidationError = validateItemFields(name, minStock, vendorName);
  if (fieldValidationError) {
    return fieldValidationError;
  }

  const item = await Item.findByPk(itemId);
  if (!item) {
    return ApiError.notFound('item not found');
  }

  return null;
};

module.exports.deleteItemById = async (itemId) => {
  const item = await Item.findByPk(itemId);
  if (!item) {
    return ApiError.notFound('item not found');
  }
  return null;
};
