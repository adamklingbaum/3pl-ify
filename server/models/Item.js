const { DataTypes } = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vendorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Item;
