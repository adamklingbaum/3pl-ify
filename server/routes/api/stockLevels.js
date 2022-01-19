const express = require('express');
const { stockLevels } = require('../../controllers');

const router = express.Router();

router.post('/', stockLevels.createStockLevel);
router.get('/', stockLevels.getStockLevels);
router.delete('/', stockLevels.deleteStockLevel);
router.post('/adjust', stockLevels.adjustStockLevel);
router.post('/set', stockLevels.setStockLevel);

module.exports = router;
