const { Transactions } = require('../db/models/');

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

module.exports.createTransaction = createTransaction;
