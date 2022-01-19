const { DataTypes } = require('sequelize');
const db = require('../db');

const Warehouse = db.define('warehouse', {
  name: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false,
  },
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(2),
    allowNull: false,
    validate: {
      is: /^(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*$/,
    },
  },
  postalCode: {
    type: DataTypes.STRING(7),
    allowNull: false,
    validate: {
      is: /^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/,
    },
  },
});

module.exports = Warehouse;
