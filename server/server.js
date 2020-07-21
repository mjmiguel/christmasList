const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// specified in .env file
const PORT = process.env.PORT;

const app = express();
const userRouter = require('./routes/users');

// body-parser to parse body for controllers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
})

// handle requests for everything else (404)
app.use('*', (req, res) => {
  res.status(404).send('404 Not Found :\(')
})

// Global error handler with nice messages
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknow middleware error',
    status: 400,
    message: { err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = app;