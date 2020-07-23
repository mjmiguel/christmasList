const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// specified in .env file
const { PORT } = process.env;

const app = express();
const userRouter = require('./routes/users');

// body-parser to parse body for controllers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// send requests for user to the userRouter
app.use('/users', userRouter);

// statically serve everything in the build folder on the route '/build'
// bundle.js is served from /build so need to point browser there with this route
app.use('/build', express.static(path.join(__dirname, '../build')));

// respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// handle requests for everything else (404)
app.use('*', (req, res) => {
  res.status(404).send('404 Not Found :(');
});

// Global error handler with nice messages
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

// catch all for react router issues
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
