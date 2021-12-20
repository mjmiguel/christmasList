const express = require('express');

const { checkLogin, setToken, verifyToken } = require('../controllers/authController');

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
router.post('/verifyToken', verifyToken, (req, res) => {
  const { tokenVerified } = res.locals;
  if (tokenVerified) {
    res.status(200).json({ tokenVerified: true });
  } else {
    res.status(401).json({ tokenVerified: false });
  }
});

module.exports = router;
