const express = require('express');

const { checkLogin, setToken } = require('../controllers/authController');

const router = express.Router();

// check password and set a JWT
router.post('/login', checkLogin, setToken, (req, res) => {
  const { authorized, token } = res.locals;
  if (authorized && token) {
    res.status(200).json({ authorized: true, token });
  } else {
    res.status(401).json({ authorized: false });
  }
});

// add route for verify token

module.exports = router;
