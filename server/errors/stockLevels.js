const { Item, Warehouse, StockLevel } = require('../models');
const ApiError = require('../middleware');

const validateUnits = (units) => {
  if (units === undefined) {
    return ApiError.badRequest('units is required');
  }

  if (units < 0) {
    return ApiError.badRequest('units must be at least 0');
  }

  return null;
};

module.exports.createStockLevel = async (itemId, warehouseId, units) => {
  const unitsError = validateUnits(units);
  if (unitsError) {
    return unitsError;
  }
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return ApiError.notFound('item not found');
    }

    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return ApiError.notFound('warehouse not found');
    }

    return null;
  } catch (error) {
    return ApiError.internal();
  }
};

module.exports.getStockLevels = async (itemId) => null;

module.exports.deleteStockLevel = async (itemId, warehouseId) => null;

module.exports.adjustStockLevel = async (itemId, warehouseId, adjustment) => {
  if (adjustment === undefined) {
    return ApiError.badRequest('adjustment is required');
  }

  if (typeof adjustment !== 'number') {
    return ApiError.badRequest('adjustment must be a number');
  }

  try {
    const stockLevel = await StockLevel.findOne({
      where: { itemId, warehouseId },
    });
    if (!stockLevel) {
      return ApiError.notFound('stockLevel not found');
    }

    if (stockLevel.units + adjustment < 0) {
      return ApiError.badRequest(
        'stockLevel after adjustment must be at least 0'
      );
    }

    return null;
  } catch (error) {
    return ApiError.internal();
  }
};

module.exports.setStockLevel = async (itemId, warehouseId, units) => {
  const unitsError = validateUnits(units);
  if (unitsError) {
    return unitsError;
  }

  try {
    const stockLevel = await StockLevel.findOne({
      where: { itemId, warehouseId },
    });
    if (!stockLevel) {
      return ApiError.notFound('stockLevel not found');
    }
    return null;
  } catch (error) {
    return ApiError.internal();
  }
};
