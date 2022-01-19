const { Warehouse } = require('../models');
const { warehouseErrors } = require('../errors');
const { ApiError } = require('../middleware');

const CREATE_WAREHOUSE = 'CREATE_WAREHOUSE';
const GET_WAREHOUSES = 'GET_WAREHOUSES';
const GET_WAREHOUSE = 'GET_WAREHOUSE';
const UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';
const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';

const getError = (req, method) => {
  switch (method) {
    case CREATE_WAREHOUSE:
      return warehouseErrors.createWarehouse(
        req.body.name,
        req.body.addressLine1,
        req.body.addressLine2,
        req.body.city,
        req.body.province,
        req.body.postalCode,
      );
    case GET_WAREHOUSES:
      return warehouseErrors.getAllWarehouses();
    case GET_WAREHOUSE:
      return warehouseErrors.getWarehouseById();
    case UPDATE_WAREHOUSE:
      return warehouseErrors.updateWarehouseById(
        req.params.warehouseId,
        req.body.name,
        req.body.addressLine1,
        req.body.addressLine2,
        req.body.city,
        req.body.province,
        req.body.postalCode,
      );
    case DELETE_WAREHOUSE:
      return warehouseErrors.deleteWarehouseById(req.params.warehouseId);
    default:
      return null;
  }
};

module.exports.createWarehouse = async (req, res, next) => {
  try {
    const error = await getError(req, CREATE_WAREHOUSE);
    if (error) {
      next(error);
      return;
    }

    const { name, addressLine1, addressLine2, city, province, postalCode } =
      req.body;
    const newWarehouse = await Warehouse.create({
      name,
      addressLine1,
      addressLine2: addressLine2 ?? null,
      city,
      province,
      postalCode,
    });
    res.status(201).json({ newWarehouse });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllWarehouses = async (req, res, next) => {
  try {
    const error = await getError(req, GET_WAREHOUSE);
    if (error) {
      next(error);
      return;
    }
    const warehouses = await Warehouse.findAll({});
    res.status(200).json({ warehouses });
  } catch (error) {
    next(error);
  }
};

module.getWarehouseById = async (req, res, next) => {
  try {
    const error = await getError(req, GET_WAREHOUSE);
    if (error) {
      next(error);
      return;
    }
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      next(ApiError.notFound('warehouse not found'));
    }
    res.staus(200).json({ warehouse });
  } catch (error) {
    next(error);
  }
};

module.exports.updateWarehouseById = async (req, res, next) => {
  try {
    const error = await getError(req, UPDATE_WAREHOUSE);
    if (error) {
      next(error);
      return;
    }
    const { warehouseId } = req.params;
    const { name, addressLine1, addressLine2, city, province, postalCode } =
      req.body;
    await Warehouse.update(
      {
        name,
        addressLine1,
        addressLine2: addressLine2 ?? null,
        city,
        province,
        postalCode,
      },
      { where: { id: warehouseId } },
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteWarehouseById = async (req, res, next) => {
  try {
    const error = await getError(req, DELETE_WAREHOUSE);
    if (error) {
      next(error);
      return;
    }
    const { warehouseId } = req.params;
    await Warehouse.destroy({ where: { id: warehouseId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
