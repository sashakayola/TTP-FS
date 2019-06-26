const Sequelize = require('sequelize');
const db = require('../db');
const { findById } = require('../../domain/users');

const Portfolio = db.define('portfolio', {
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
  }
});

// function check if a security can be added to ones portfolio (if the person has enough cash)
Portfolio.prototype.verifyCanAdd = function(userId, currentPrice) {
  let user = findById(userId);
  return user.balance > currentPrice;
}

module.exports = Portfolio;
