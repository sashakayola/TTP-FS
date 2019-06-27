const router = require('express').Router();
const { getStockInfo } = require('../domain/iex');
const { createTransaction } = require('../domain/transactions');
const { verifyBuy } = require('../domain/transactions');
const { updateUserCash } = require('../domain/users');
const { addToHoldings } = require('../domain/holdings');

// buy transaction
router.post('/buy', async (req, res, next) => {
  const ticker = req.body.ticker;
  const quantity = Number(req.body.quantity);
  const userId = req.body.userId;
  let stockInfo = null;
  try {
    const response = await getStockInfo(ticker);
    stockInfo = response;
  } catch (error) {
    res.status(400).send('Invalid ticker');
  }

  let latestPrice = stockInfo.data.quote.latestPrice;
  let canBuy = await verifyBuy(userId, quantity, latestPrice);
  if (canBuy) {
    let transactionType = 'buy';
    await createTransaction(
      ticker,
      quantity,
      latestPrice,
      transactionType,
      userId,
    ); // creating a buy transaction in transaction table
    await addToHoldings(ticker, quantity, userId);
    let updatedUserBalance = await updateUserCash(
      userId,
      transactionType,
      quantity,
      latestPrice,
    ); // update user's cash balance
    res.status(201).json({
      open: stockInfo.data.quote.open,
      latestPrice: stockInfo.data.quote.latestPrice,
      updatedUserBalance,
    });
  } else {
    res.status(400).send('Cash balance too low');
  }
});

module.exports = router;
