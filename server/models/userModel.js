const { Pool } = require('pg');
require('dotenv').config();

const { PG_URI } = process.env;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.

// user_id SERIAL PRIMARY KEY,
// name VARCHAR(20),
// password VARCHAR(50),
// wishlist VARCHAR(1000),
// giftee VARCHAR(20)

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
