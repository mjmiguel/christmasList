const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// route verify login
router.post('/login', authController.checkLogin, (req, res) => {
  if (res.locals.authorized) {
    res.status(200).json({ authorized: true });
  } else {
    res.status(401).json({ authorized: false });
  }
});

module.exports = router;
