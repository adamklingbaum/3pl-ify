const Item = require('./Item');
const Warehouse = require('./Warehouse');
const StockLevel = require('./StockLevel');

// Item < StockLevel (1:m)
Item.hasMany(StockLevel);
StockLevel.belongsTo(Item);

// Warehouse < StockLevel (1:m)
Warehouse.hasMany(StockLevel);
StockLevel.belongsTo(Warehouse);

module.exports = { Item, Warehouse, StockLevel };
