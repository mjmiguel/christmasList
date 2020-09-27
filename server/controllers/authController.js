const db = require('../models/userModel');

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

module.exports = authController;
