const { Transactions } = require('../db/models/');
const { findById } = require('./users');
// function to get add transaction to transactions table (buy or sell)
const createTransaction = async (
  ticker,
  quantity,
  price,
  transactionType,
  userId,
) => {
  let transaction = await Transactions.create({
    ticker,
    quantity,
    price,
    transactionType,
    userId,
  });
  return transaction;
};

// verify if the user has enough cash for a buy transaction
const verifyBuy = async (userId, quantity, latestPrice) => {
 let user = await findById(userId);
 let userCashBalance = user.balance;
 let remainingBalance = userCashBalance - latestPrice * quantity;
 return remainingBalance > 0;
}

module.exports.createTransaction = createTransaction;
module.exports.verifyBuy = verifyBuy;
