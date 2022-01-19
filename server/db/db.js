require('dotenv').config();
const { Sequelize } = require('sequelize');

const { PG_URI } = process.env;
const db = new Sequelize(PG_URI, { logging: false });

module.exports = db;
