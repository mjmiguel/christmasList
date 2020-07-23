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
  const { user, wishlist } = req.body;
  const queryString = 'UPDATE users SET wishlist = $1 WHERE name = $2 RETURNING name, wishlist AS new_wishlist';
  const params = [wishlist, user];
  console.log(req.body);
  db.query(queryString, params)
    .then((updatedUser) => {
      res.locals.user = updatedUser.rows[0];
      next();
    }).catch((err) => next(err));
};

userController.addUser = (req, res, next) => {
  // add user

};

module.exports = userController;
