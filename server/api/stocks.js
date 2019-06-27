const router = require('express').Router();
const { getStockInfo } = require('../domain/stocks');
const { findById } = require('../domain/users');
const { createTransaction } = require('../domain/transactions');

// buy transaction
router.post('/buy', async (req, res, next) => {
  try {
    const ticker = req.body.ticker;
    const quantity = Number(req.body.quantity);
    const userId = req.body.userId;

    const response = await getStockInfo(ticker);
    let latestPrice = response.data.quote.latestPrice;
    let transactionType = 'buy';

    // get the user's current balance
    let user = await findById(userId);
    let userCashBalance = user.balance;

    // see if user has enough cash for transaction
    let remainingBalance = userCashBalance - latestPrice * quantity;
    if (remainingBalance > 0) {
      await createTransaction(ticker, quantity, latestPrice, transactionType, userId); // creating a buy transaction
      res.status(200).json({
        open: response.data.quote.open,
        latestPrice: response.data.quote.latestPrice,
      });
    } else {
      res.status(400).send('Cash balance too low');
    }
  } catch (error) {
    res.status(400).send('Invalid ticker');
  }
});


module.exports = router;
