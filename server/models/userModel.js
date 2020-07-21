const mongoose = require('mongoose');

const MONGO_URI =
// url for mongo db cluster

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'starwars',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  list: { type: String}
});


module.exports = mongoose.model('User', userSchema);