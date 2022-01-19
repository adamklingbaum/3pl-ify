const { DataTypes } = require('sequelize');
const db = require('../db');

const StockLevel = db.define('stock_level', {
  units: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = StockLevel;
