const { Warehouse } = require('../models');
const ApiError = require('../middleware');
const validateStringField = require('./validateStringField');

const validateProvince = (province) => {
  const provinceRegEx = /^(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*$/;

  if (province === undefined) {
    return ApiError.badRequest('province is required');
  }

  if (!provinceRegEx.test(province)) {
    return ApiError.badRequest('province must be an official abbreviation');
  }

  return null;
};

const validatePostalCode = (postalCode) => {
  const postalCodeRegEx = /^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/;

  if (postalCode === undefined) {
    return ApiError.badRequest('postalCode is required');
  }

  if (!postalCodeRegEx.test(postalCode)) {
    ApiError.badRequest('postalCode must be in correct format (e.g., A1B 2C3)');
  }

  return null;
};

const validateWarehouseFields = (
  name,
  addressLine1,
  addressLine2,
  city,
  province,
  postalCode
) => {
  const nameError = validateStringField('name', name);
  if (nameError) {
    return nameError;
  }

  const addressLine1Error = validateStringField('addressLine1', addressLine1);
  if (addressLine1Error) {
    return addressLine1Error;
  }

  if (addressLine2) {
    const addressLine2Error = validateStringField('addressLine2', addressLine2);
    if (addressLine2Error) {
      return addressLine2Error;
    }
  }

  const cityError = validateStringField('city', city);
  if (cityError) {
    return cityError;
  }

  const provinceError = validateProvince(province);
  if (provinceError) {
    return provinceError;
  }

  const postalCodeError = validatePostalCode(postalCode);
  if (postalCodeError) {
    return postalCodeError;
  }

  return null;
};

module.exports.createWarehouse = (
  name,
  addressLine1,
  addressLine2,
  city,
  province,
  postalCode
) => {
  const fieldValidationError = validateWarehouseFields(
    name,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode
  );
  return fieldValidationError;
};

module.exports.getAllWarehouses = () => null;

module.exports.getWarehouseById = () => null;

module.exports.updateWarehouseById = async (
  warehouseId,
  name,
  addressLine1,
  addressLine2,
  city,
  province,
  postalCode
) => {
  const fieldValidationError = validateWarehouseFields(
    warehouseId,
    name,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode
  );
  if (fieldValidationError) {
    return fieldValidationError;
  }
  try {
    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return ApiError.notFound('warehouse not found');
    }
  } catch (error) {
    return ApiError.internal();
  }
  return null;
};

module.exports.deleteWarehouseById = async (warehouseId) => {
  try {
    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return ApiError.notFound('warehouse not found');
    }
    return null;
  } catch (error) {
    return ApiError.internal();
  }
};
