// functions to create user and get user information based on user id
// getting the user info will call the transactions and portfolio functions

const { User } = require('../db/models');

// function to create a new user
const createUser = async (
  firstName,
  lastName,
  email,
  password,
  balance = 5000
) => {
  let user = await User.create({
    firstName,
    lastName,
    email,
    password,
    balance,
  });
  console.log(user);
  return user;
};

module.exports.createUser = createUser;
