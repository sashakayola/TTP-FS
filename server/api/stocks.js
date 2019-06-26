const router = require('express').Router();
const axios = require('axios');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const ticker = 'AAPL';
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
