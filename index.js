const express = require('express');
const app = express();

app.use('*', (req, res) => {
  res.send('Test Express');
});

app.listen(3001);