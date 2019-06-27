const router = require('express').Router();
const { createUser, findByEmail, findById } = require('../domain/users');
const { getHoldings } = require('../domain/holdings');

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await findById(userId);
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      balance: user.balance
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

router.post('/', async (req, res, next) => {
  try {
    let user = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );

    // to establish login session. after login complete, user will be assigned to req.user
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

module.exports = router;
