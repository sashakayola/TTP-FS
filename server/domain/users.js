const User = require('../db/models/user');

// add new user
const createUser = async (
  firstName,
  lastName,
  email,
  password,
  balance = 5000, // set initial balance to $5000
) => {
  let user = await User.create({
    firstName,
    lastName,
    email,
    password,
    balance,
  });
  return user;
};

// find user by email if they exist in db
const findByEmail = async email => {
  let user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

// find user by id if they exist in db
const findById = async id => {
  let user = await User.findByPk(id);
  return user;
};

// update user's cash balance to process transaction
const updateUserCash = async (id, transactionType, quantity, price) => {
  let user = await User.findByPk(id);
  let balance = user.dataValues.balance;
  let totalAmount = quantity * price;

  if (transactionType === 'Buy') {
    let newBalance = balance - totalAmount;
    User.update({ balance: newBalance }, { where: { id } });
    return newBalance;
  } else {
    // else transaction is a sell
    let newBalance = balance + totalAmount;
    User.update({ balance: newBalance }, { where: { id } });
    return newBalance;
  }
};

module.exports.createUser = createUser;
module.exports.findByEmail = findByEmail;
module.exports.findById = findById;
module.exports.updateUserCash = updateUserCash;
