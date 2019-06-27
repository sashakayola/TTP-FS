const router = require('express').Router();
const { getStockInfo } = require('../domain/stocks');
const { createTransaction } = require('../domain/transactions');
const { verifyBuy } = require('../domain/transactions');
const { updateUserCash } = require('../domain/users');

// buy transaction
router.post('/buy', async (req, res, next) => {
  try {
    const ticker = req.body.ticker;
    const quantity = Number(req.body.quantity);
    const userId = req.body.userId;

    const response = await getStockInfo(ticker);
    let latestPrice = response.data.quote.latestPrice;

    let canBuy = await verifyBuy(userId, quantity, latestPrice)
    if (canBuy) {
      let transactionType = 'buy';
      await createTransaction(ticker, quantity, latestPrice, transactionType, userId); // creating a buy transaction in transaction table
      await updateUserCash(userId, transactionType, quantity, latestPrice); // update user's cash balance
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
