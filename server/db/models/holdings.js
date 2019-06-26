const Sequelize = require('sequelize');
const db = require('../db');
const { findById } = require('../../domain/users');

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
  dateBought: {
    type: Sequelize.DATEONLY
  }
});

// function check if a security can be added to ones portfolio (if the person has enough cash)
Holdings.prototype.verifyCanAdd = function(userId, currentPrice) {
  let user = findById(userId);
  return user.balance > currentPrice;
}

module.exports = Holdings;
