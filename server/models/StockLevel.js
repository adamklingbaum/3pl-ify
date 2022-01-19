const { DataTypes } = require('sequelize');
const db = require('../db');

const StockLevel = db.define('stockLevel', {
  units: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = StockLevel;
