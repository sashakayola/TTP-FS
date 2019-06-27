const Holdings = require('../db/models/holdings');

// add stock to portfolio
const addToHoldings = async (ticker, quantity, userId) => {
  try {
    const stock = await Holdings.findOne({ where: { userId, ticker: ticker } });
    let currentQuantity = stock.dataValues.quantity;
    let newQuantity = currentQuantity + quantity;
    await Holdings.update(
      { quantity: newQuantity },
      { where: { userId, ticker: ticker } },
    );
  } catch (error) {
    await Holdings.create({
      ticker,
      quantity,
      userId,
    });
  }
};

module.exports.addToHoldings = addToHoldings;
