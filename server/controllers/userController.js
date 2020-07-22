const db = require('../models/userModel');

const userController = {};

// get all users in db
userController.getAllUsers = (req, res, next) => {
  const queryString = 'SELECT * FROM users';
  db.query(queryString)
    .then((users) => {
      res.locals.users = users.rows;
      next();
    }).catch((err) => next(err));
};

//  get a specific person from req.params
userController.getUser = (req, res, next) => {
  console.log('params ', req.params);
  const oneUser = req.query.id;
  // using parameterized query
  const queryString = 'SELECT * FROM users WHERE user_id=$1';
  const params = [oneUser];
  db.query(queryString, params)
    .then((users) => {
      res.locals.users = users.rows;
      next();
    }).catch((err) => next(err));
};

//  update wishlist
userController.updateWishList = (req, res, next) => {
  const wishList = req.body;
  const user = ''; // either req.query.id or req.params.id
  // update a wishlist for a specific person
  // need a way to grab the specific userid: req.query bs req.params
  const queryString = 'UPDATE users SET wishlist = $1 WHERE user_id = $2';
  const params = [wishList, user]
  db.query(queryString, params)
    .then((users) => {
      res.locals.users = users;
      next();
    }).catch((err) => next(err));
};

userController.addUser = (req, res, next) => {
  // add user

};

module.exports = userController;
