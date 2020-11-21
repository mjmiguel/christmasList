const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 12; // should be at least 10
require('dotenv').config();

const authController = {};
const { SITE_LOGIN_PASSWORD } = process.env;

//  update passwords for ALL users
authController.updatePassword = (req, res, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    bcrypt.hash(SITE_LOGIN_PASSWORD, salt, function (err, hash) {
      // Store hash in DB.
      const queryString = 'UPDATE users SET password = $1';
      const params = [hash];
      db.query(queryString, params)
        .then((res) => {
          console.log('passwords updated');
          next();
        })
        .catch((err) => next({ location: 'updatePassword query', ...err }));
    });
  });
};

authController.checkLogin = (req, res, next) => {
  const { password } = req.body;
  const queryString = 'SELECT * FROM users WHERE id=1';
  console.log('req body', req.body);
  db.query(queryString)
    .then((users) => {
      console.log('users', users.rows[0]);
      res.locals.users = users.rows[0];
      bcrypt
        .compare(password, res.locals.users.password)
        .then((res) => {
          console.log('res', res);
          res ? (res.locals.authorized = true) : (res.locals.authorized = false);
          next();
        })
        .catch((err) => next({ location: 'bcrypt-compare', ...err }));
    })
    .catch((err) => next({ location: 'checklogin-getuser', ...err }));
};

// protect route
// verify token

// verify token

// create token

module.exports = authController;
