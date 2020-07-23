const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// route to get a specific person from req.params
router.get('/:id', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.users);
});

// get everyone in the database
router.get('/', userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

// route to update wishlist
router.post('/', userController.updateWishList, (req, res) => {
  res.status(200).json(res.locals.user);
});
// route to add user

// route to compare user names with array of 'still need to add wishlist'

module.exports = router;
