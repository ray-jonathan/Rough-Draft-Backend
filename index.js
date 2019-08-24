const express = require('express');
const app = express();
const buildBrew = require('./breweryBuilder');
app.use(express.json());


app.use('/build', async (req, res) => {
  await buildBrew();
  res.send("Done?");
});


app.listen(3001);