const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = User.findByPk(userId);
    res.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } catch (error) {
    next(error)
  }
})
