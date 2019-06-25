const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  // try {
  //   const newUser = User.create({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //   if (!newUser) {
  //     res.status(401).send("Please Enter a Valid Email");
  //   }
  //   else res.status(201).json(newUser)

  // } catch (error) {
  //     // if (error.name === "SequelizeUniqueConstraintError") {
  //     // } else if (error.name === "SequelizeValidationError") {
  //     //   res.status(401).send("Please Enter a Valid Email");
  //     // } else {
  //       next(error);
  //     // }
  // }

  try {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    // req.login(user, err => (err ? next(err) : res.json(user)))
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
    const user = await User.findOne({
      where: {
        email: req.body.email.toLowerCase(),
      },
    });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    }
  } catch (error) {
    next(error);
  }
});
