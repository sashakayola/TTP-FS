const router = require('express').Router();
const {
  createUser,
  findByEmail,
  findById,
  updateUserCash,
} = require('../domain/users');
const { addToHoldings, getHoldings } = require('../domain/holdings');
const { getStockInfo } = require('../domain/iex');
const {
  createTransaction,
  getTransactions,
  verifyBuy,
} = require('../domain/transactions');

router.post('/', async (req, res, next) => {
  try {
    const user = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    );
    // to establish login session. after login complete, user assigned to req.user
    req.login(user, err => (err ? next(err) : res.status(201).json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(401).send('Please Enter a Valid Email');
    } else {
      next(err);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email.toLowerCase());
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.status(200).json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await findById(userId);
    const holdings = await getHoldings(userId);
    const transactions = await getTransactions(userId);
    res.status(200).json({
      user: { user },
      holdings: { holdings },
      transactions: { transactions },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/holdings', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const holdings = await getHoldings(userId);
    res.status(200).send(holdings);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/transactions', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const transactions = await getTransactions(userId);
    res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/transactions', async (req, res, next) => {
  const ticker = req.body.ticker;
  const quantity = Number(req.body.quantity);
  const transactionType = req.body.transactionType;
  const userId = req.params.userId;
  let latestStockPrice = null;

  // check that ticker is valid
  try {
    const response = await getStockInfo(ticker);
    latestStockPrice = response.data.quote.latestPrice;
  } catch (error) {
    res.status(400).send('Invalid ticker');
  }

  // check that user has enough cash if buy transaction
  const canBuy = await verifyBuy(userId, quantity, latestStockPrice);

  // if the user has enough cash for a buy OR the user is selling, process transaction
  if (canBuy || transactionType === 'Sell') {
    // add transaction
    await createTransaction(
      ticker,
      quantity,
      latestStockPrice,
      transactionType,
      userId,
    );

    // update user cash balance for transaction
    await updateUserCash(userId, transactionType, quantity, latestStockPrice);

    // add transaction to current holdings for buy transaction
    if (transactionType === 'Buy') {
      await addToHoldings(ticker, quantity, userId);
    }
    res.status(201).send('Transaction successfully posted');
  } else {
    res.status(400).send('Cash balance too low');
    return;
  }
});

module.exports = router;
