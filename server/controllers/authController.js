const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {};

const { SITE_LOGIN_PASSWORD, JWT_PRIVATE_KEY } = process.env;
const SALT_FACTOR = 12; // should be at least 10

//  update passwords for ALL users
authController.updatePassword = (req, res, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) next({ location: 'bcryptGenSalt', ...err });
    bcrypt.hash(SITE_LOGIN_PASSWORD, salt, (err, hash) => {
      if (err) next({ location: 'bcryptHash', ...err });
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

authController.checkLogin = async (req, res, next) => {
  const { password } = req.body;
  const queryString = 'SELECT * FROM users WHERE id=1';

  // get one user to compare password
  const user = await db.query(queryString);
  res.locals.user = user.rows[0];

  // compare password to db hash
  bcrypt.compare(password, res.locals.user.password, (err, result) => {
    if (err) next({ location: 'bcrypt-compare', ...err });
    result ? (res.locals.authorized = true) : (res.locals.authorized = false);
    next();
  });
};

authController.setToken = (req, res, next) => {
  jwt.sign({ I: 'amCool' }, JWT_PRIVATE_KEY, (err, token) => {
    if (err) next({ location: 'setToken', ...err });
    // set token
    res.locals.token = token;
    next();
  });
};

authController.verifyToken = (req, res, next) => {
  // jwt.verify(token, secretOrPublicKey, [options, callback])
  // jwt.verify(token, 'shhhhh', function(err, decoded) {
  //   console.log(decoded.foo) // bar
  // });
};
// protect route
// verify token

// verify token

// create token

module.exports = authController;
