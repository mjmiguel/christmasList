const db = require('../models/userModel');
const bcrypt = require('bcryptjs');

const authController = {};

//  get a specific person from req.params
// userController.getUser = (req, res, next) => {
//   const oneUser = req.query.id;
//   // using parameterized query
//   const queryString = 'SELECT * FROM users WHERE user_id=$1';
//   const params = [oneUser];
//   db.query(queryString, params)
//     .then((users) => {
//       res.locals.users = users.rows;
//       next();
//     }).catch((err) => next(err));
// };

authController.checkLogin = (req, res, next) => {
  // boilerplate for now to rest middleware
  const { password } = req.body;
  const queryString = 'SELECT * FROM users WHERE id=1';
  // const params = [oneUser];
  console.log('req body', req.body);
  db.query(queryString)
    .then((users) => {
      res.locals.users = users.rows;
      bcrypt
        .compare(password, res.locals.user.password)
        .then((res) => {
          res ? (res.locals.authorized = true) : (res.locals.authorized = false);
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// protect route
// verify token

// verify token

// create token

module.exports = authController;
