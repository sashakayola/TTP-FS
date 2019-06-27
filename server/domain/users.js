const
  User
 = require('../db/models/user');

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  balance = 5000 // set initial balance to $5000
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

const findByEmail = async email => {
  let user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const findById = async id => {
  let user = await User.findByPk(id);
  return user;
};

module.exports.createUser = createUser;
module.exports.findByEmail = findByEmail;
module.exports.findById = findById;
