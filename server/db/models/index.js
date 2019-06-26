const User = require('./user')
const Holdings = require('./holdings')
const Transactions = require('./transactions')

Holdings.belongsTo(User)
User.hasMany(Holdings)

Transactions.belongsTo(User)
User.hasMany(Transactions)

module.exports = { User }
