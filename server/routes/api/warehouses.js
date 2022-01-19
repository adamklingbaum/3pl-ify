const express = require('express');
const { warehouses } = require('../../controllers');

const router = express.Router();

router.post('/', warehouses.createWarehouse);
router.get('/', warehouses.getAllWarehouses);
router.get('/:warehouseId', warehouses.getWarehouseById);
router.put('/:warehouseId', warehouses.updateWarehouseById);
router.delete('/:itemId', warehouses.deleteWarehouseById);

module.exports = router;
