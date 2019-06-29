const router = require('express').Router();

router.get('/me', (req, res) => {

    const user = req.session.passport;
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(400).send(null);

    }

});

module.exports = router;
