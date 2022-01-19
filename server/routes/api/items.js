const express = require('express');
const router = express.Router();
const { items } = require('../../controllers');

router.post('/', items.createItem);
router.get('/', items.getAllItems);
router.get('/:itemId', items.getItemById);
router.put('/:itemId', items.updateItemById);
router.delete('/:itemId', items.deleteItemById);

module.exports = router;
