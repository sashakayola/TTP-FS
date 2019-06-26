const Sequelize = require('sequelize');
const db = require('../db');

const Transactions = db.define('transactions', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  priceBought: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATEONLY
  },
  dateBought: {
    type: Sequelize.DATEONLY
  }
});

module.exports = Transactions;
