const express = require('express');
const router = express.Router();
const { stockLevels } = require('../../controllers');

router.post('/', stockLevels.createStockLevel);
router.get('/', stockLevels.getStockLevels);
router.delete('/', stockLevels.deleteStockLevel);
router.post('/adjust', stockLevels.adjustStockLevel);
router.post('/set', stockLevels.setStockLevel);

module.exports = router;
