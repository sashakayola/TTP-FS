const { Transactions } = require('../db/models/');
const { findById } = require('./users');

// get all transactions for user
const getTransactions = async userId => {
  try {
    const transactions = await Transactions.findAll({ where: { userId } });
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

// add transaction to transactions table (buy or sell)
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

// verify if user has enough cash for buy transaction
const verifyBuy = async (userId, quantity, latestPrice) => {
  let user = await findById(userId);
  let userCashBalance = user.balance;
  let remainingBalance = userCashBalance - latestPrice * quantity;
  return remainingBalance > 0;
};

module.exports.getTransactions = getTransactions;
module.exports.createTransaction = createTransaction;
module.exports.verifyBuy = verifyBuy;
