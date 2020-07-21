const express = require('express');
const bodyParser = require('body-parser');


const PORT = 3000;

const app = expres();





app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;