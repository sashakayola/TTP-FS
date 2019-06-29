const Holdings = require('../db/models/holdings');

// get all holdings associated with user id
const getHoldings = async userId => {
  try {
    const currentHoldings = await Holdings.findAll({ where: { userId } });
    return currentHoldings;
  } catch (error) {
    console.log(error);
  }
};

// add stock to user's portfolio
const addToHoldings = async (ticker, quantity, userId) => {
  try {
    const stock = await Holdings.findOne({ where: { userId, ticker: ticker } });
    const currentQuantity = stock.dataValues.quantity;
    const newQuantity = currentQuantity + quantity;

    // if the user already has stock's with this ticker, update the quantity
    await Holdings.update(
      { quantity: newQuantity },
      { where: { userId, ticker: ticker } },
    );
  } catch (error) {
    // if the user does not own a stock with this tocker, add to their portfolio
    await Holdings.create({
      ticker,
      quantity,
      userId,
    });
  }
};

module.exports.addToHoldings = addToHoldings;
module.exports.getHoldings = getHoldings;
