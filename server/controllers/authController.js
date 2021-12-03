const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const db = require('../models/userModel');
require('dotenv').config();

const authController = {};

const { SITE_LOGIN_PASSWORD, JWT_PRIVATE_KEY, RECAPTCHA_SECRET } = process.env;
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
  // create token only if password verified
  if (res.locals.authorized) {
    jwt.sign({ I: 'amCool' }, JWT_PRIVATE_KEY, { expiresIn: '14d' }, (err, token) => {
      if (err) next({ location: 'setToken', ...err });
      // set token
      res.locals.token = token;
      next();
    });
  } else {
    next();
  }
};

authController.verifyToken = (req, res, next) => {
  const { currentToken } = req.body;
  jwt.verify(currentToken, JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) next({ location: 'verifyToken', ...err });
    console.log('decoded', decoded);
    // verify token and confirm signature
    if (decoded && (decoded.I = 'amCool')) {
      res.locals.tokenVerified = true;
      next();
    } else {
      res.locals.tokenVerified = false;
      next();
    }
  });
};

// for recaptcha v3
// authController.verifyCaptcha = (req, res, next) => {
//   const { captchaToken } = req.body;
//   const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captchaToken}`;
//   console.log('BE captcha token', captchaToken);
//   const options = { method: 'POST' };
//   fetch(url, options)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('got data back from captcha', data);
//       const { success, score, action } = data;
//       if (success) {
//         res.locals.captchaScore = score;
//         console.log('captcha res action', action);
//         next();
//       }
//       next();
//     })
//     .catch((error) => {
//       if (error) next({ location: 'verifty captcha fetch', ...err });
//     });
// };

module.exports = authController;
