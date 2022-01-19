const express = require('express');
const { items } = require('../../controllers');

const router = express.Router();

router.post('/', items.createItem);
router.get('/', items.getAllItems);
router.get('/:itemId', items.getItemById);
router.put('/:itemId', items.updateItemById);
router.delete('/:itemId', items.deleteItemById);

module.exports = router;
