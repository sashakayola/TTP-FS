const Sequelize = require('sequelize');
const db = require('../db');

const Holdings = db.define('holdings', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
});

module.exports = Holdings;
