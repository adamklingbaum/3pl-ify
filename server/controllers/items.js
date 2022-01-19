const { Item } = require('../models');
const { itemErrors } = require('../errors');
const { ApiError } = require('../middleware');

const CREATE_ITEM = 'CREATE_ITEM';
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEM = 'GET_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

const getError = (req, method) => {
  switch (method) {
    case CREATE_ITEM:
      return itemErrors.createItem(
        req.body.name,
        req.body.minStock,
        req.body.vendorName,
      );
    case GET_ITEMS:
      return itemErrors.getAllItems();
    case GET_ITEM:
      return itemErrors.getItemById();
    case UPDATE_ITEM:
      return itemErrors.updateItemById(
        req.params.itemId,
        req.body.name,
        req.body.minStock,
        req.body.vendorName,
      );
    case DELETE_ITEM:
      return itemErrors.deleteItemById(req.params.itemId);
    default:
      return null;
  }
};

module.exports.createItem = async (req, res, next) => {
  try {
    const error = await getError(req, CREATE_ITEM);
    if (error) {
      next(error);
      return;
    }
    const { name, minStock, vendorName } = req.body;
    const newItem = await Item.create({ name, minStock, vendorName });
    res.status(201).json({ newItem });
  } catch (error) {
    next(ApiError.internal());
  }
};

module.exports.getAllItems = async (req, res, next) => {
  try {
    const error = await getError(req, GET_ITEMS);
    if (error) {
      next(error);
      return;
    }
    const items = await Item.findAll({});
    res.status(200).json({ items });
  } catch (error) {
    next(ApiError.internal());
  }
};

module.exports.getItemById = async (req, res, next) => {
  try {
    const error = await getError(req, GET_ITEM);
    if (error) {
      next(error);
      return;
    }
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId);
    if (!item) {
      next(ApiError.notFound('item not found'));
      return;
    }
    res.status(200).json({ item });
  } catch (error) {
    next(ApiError.internal());
  }
};

module.exports.updateItemById = async (req, res, next) => {
  try {
    const error = await getError(req, UPDATE_ITEM);
    if (error) {
      next(error);
      return;
    }
    const { itemId } = req.params;
    const { name, minStock, vendorName } = req.body;
    await Item.update(
      { name, minStock, vendorName },
      { where: { id: itemId } },
    );
    res.sendStatus(204);
  } catch (error) {
    next(ApiError.internal());
  }
};

module.exports.deleteItemById = async (req, res, next) => {
  try {
    const error = await getError(req, DELETE_ITEM);
    if (error) {
      next(error);
      return;
    }
    const { itemId } = req.params;
    await Item.destroy({ where: { id: itemId } });
    res.sendStatus(204);
  } catch (error) {
    next(ApiError.internal());
  }
};
