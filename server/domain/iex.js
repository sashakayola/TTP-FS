const axios = require('axios');

// external IEX api call to get stock info
const getStockInfo = async ticker => {
  const stockInfo = await axios.get(
    `https://api.iextrading.com/1.0/stock/${ticker}/book`,
  );
  return stockInfo;
};

module.exports.getStockInfo = getStockInfo;
