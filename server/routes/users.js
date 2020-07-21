// need to require userController
// need to list get, update, add routes for users here
// need to export
const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();


// get everyone in the database
router.get('/') //middleware to get all users)

// route to get a specific person from req.params

// route to update wishlist

// route to add user

// route to compare user names with array of 'still need to add wishlist'

module.exports = router;