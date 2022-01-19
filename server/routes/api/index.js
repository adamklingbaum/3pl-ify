const express = require('express');
const itemsRouter = require('./items');
const warehousesRouter = require('./warehouses');
const stockLevelsRouter = require('./stockLevels');
const apiErrorHandler = require('../../middleware');

const router = express.Router();

router.use('/items', itemsRouter);
router.use('/warehouse', warehousesRouter);
router.use('/stockLevels', stockLevelsRouter);
router.use(apiErrorHandler);

module.exports = router;
