const router = require('express').Router();
const { getStockInfo } = require('../domain/iex');

router.get('/:ticker', async (req, res, next) => {
  const ticker = req.params.ticker;
  let stockInfo = await getStockInfo(ticker);
  let latestPrice = stockInfo.data.quote.latestPrice;
  let open = stockInfo.data.quote.open;
  res.status(200).json({
    open,
    latestPrice,
  });
});

module.exports = router;
