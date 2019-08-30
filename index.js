const express = require('express');
const app = express();
const fs = require('fs');

const buildBrew = require('./breweryBuilder');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));

app.use(express.json());


app.use('/build', async (req, res) => {
  const breweriesJSON = readBrewery();
  
  res.json(breweriesJSON);
});


app.listen(3001);