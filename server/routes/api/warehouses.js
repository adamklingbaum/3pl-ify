const express = require('express');
const router = express.Router();
const { warehouses } = require('../../controllers');

router.post('/', warehouses.createWarehouse);
router.get('/', warehouses.getAllWarehouses);
router.get('/:warehouseId', warehouses.getWarehouseById);
router.put('/:warehouseId', warehouses.updateWarehouseById);
router.delete('/:itemId', warehouses.deleteWarehouseById);

module.exports = router;
