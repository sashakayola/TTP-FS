const Holdings = require('../db/models/holdings');

// get all holdings associated with a user id
const getHoldings = async userId => {
  try {
    const currentHoldings = await Holdings.findAll({ where: { userId } });
    return currentHoldings;
  } catch (error) {
    console.log(error);
  }
};

// add stock to a user's portfolio
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
module.exports.getHoldings = getHoldings;
