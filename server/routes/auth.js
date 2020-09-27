const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// route verify login
router.post('/', authController.checkLogin, (req, res) => {
  // res.status(201).json(res.locals.user);
});

module.exports = router;
