const { StockLevel, Warehouse } = require('../models');
const { stockLevelErrors } = require('../errors');

const CREATE_STOCK_LEVEL = 'CREATE_STOCK_LEVEL';
const GET_STOCK_LEVELS = 'GET_STOCK_LEVELS';
const DELETE_STOCK_LEVEL = 'DELETE_STOCK_LEVEL';
const ADJUST_STOCK_LEVEL = 'ADJUST_STOCK_LEVEL';
const SET_STOCK_LEVEL = 'SET_STOCK_LEVEL';

const getError = (req, method) => {
  switch (method) {
    case CREATE_STOCK_LEVEL:
      return stockLevelErrors.createStockLevel(
        req.body.itemId,
        req.body.warehouseId,
        req.body.units,
      );
    case GET_STOCK_LEVELS:
      return stockLevelErrors.getStockLevels(req.query.itemId);
    case DELETE_STOCK_LEVEL:
      return stockLevelErrors.deleteStockLevel(
        req.query.itemId,
        req.query.warehouseId,
      );
    case ADJUST_STOCK_LEVEL:
      return stockLevelErrors.adjustStockLevel(
        req.body.itemId,
        req.body.warehouseId,
        req.body.adjustment,
      );
    case SET_STOCK_LEVEL:
      return stockLevelErrors.setStockLevel(
        req.body.itemId,
        req.body.warehouseId,
        req.body.units,
      );
    default:
      return null;
  }
};

module.exports.createStockLevel = async (req, res, next) => {
  try {
    const error = await getError(req, CREATE_STOCK_LEVEL);
    if (error) {
      next(error);
      return;
    }

    const { itemId, warehouseId, units } = req.body;
    const stockLevel = await StockLevel.create({ itemId, warehouseId, units });
    res.status(201).json({ stockLevel });
  } catch (error) {
    next(error);
  }
};

module.exports.getStockLevels = async (req, res, next) => {
  try {
    const error = await getError(req, GET_STOCK_LEVELS);
    if (error) {
      next(error);
      return;
    }

    const { itemId } = req.query;
    const stockLevels = await StockLevel.findAll({
      where: { itemId },
      include: [{ model: Warehouse, attributes: ['id', 'name'] }],
    });
    res.status(200).json({ stockLevels });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStockLevel = async (req, res, next) => {
  try {
    const error = await getError(req, DELETE_STOCK_LEVEL);
    if (error) {
      next(error);
      return;
    }

    const { itemId, warehouseId } = req.query;
    await StockLevel.destroy({
      where: {
        itemId,
        warehouseId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports.adjustStockLevel = async (req, res, next) => {
  try {
    const error = await getError(req, ADJUST_STOCK_LEVEL);
    if (error) {
      next(error);
      return;
    }

    const { itemId, warehouseId, adjustment } = req.body;
    const stockLevel = await StockLevel.findOne({
      where: { itemId, warehouseId },
    });
    stockLevel.set({
      units: stockLevel.units + adjustment,
    });
    await stockLevel.save();
    res.status(201).json({ stockLevel });
  } catch (error) {
    next(error);
  }
};

module.exports.setStockLevel = async (req, res, next) => {
  try {
    const error = await getError(req, SET_STOCK_LEVEL);
    if (error) {
      next(error);
      return;
    }

    const { itemId, warehouseId, units } = req.body;
    const stockLevel = await StockLevel.findOne({
      where: { itemId, warehouseId },
    });
    stockLevel.set({
      units,
    });
    await stockLevel.save();
    res.status(201).json({ stockLevel });
  } catch (error) {
    next(error);
  }
};
