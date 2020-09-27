const path = require('path');
const express = require('express');
require('dotenv').config();

// specified in .env file
const { PORT } = process.env;

const app = express();
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// body-parser to parse body for controllers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve stylesheets and pictures???
app.use(express.static(path.resolve(__dirname, 'client')));

// send specific requests to specific routes
app.use('/users', userRouter);
app.use('/auth', authRouter);

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
