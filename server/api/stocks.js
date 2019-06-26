const router = require('express').Router();
const axios = require('axios');

router.get('/:ticker', async (req, res, next) => {
  try {
    const ticker = req.params.ticker;
    const response = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/book`
    );
    res.status(200).json({
      open: response.data.quote.open,
      latestPrice: response.data.quote.latestPrice,
    });
  } catch (error) {
    console.log('Invalid ticker');
    res.status(400).send('Invalid ticker');
  }
});

module.exports = router;
