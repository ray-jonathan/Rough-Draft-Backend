const express = require('express');
const app = express();
const fs = require('fs');

const buildBrew = require('./breweryBuilder');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const readStates = () => JSON.parse(fs.readFileSync('./states.json'));
const readBrewStates = () => JSON.parse(fs.readFileSync('./brewery-by-state.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));
const writeBrewStates = (data) => fs.writeFileSync('./brewery-by-state.json', JSON.stringify(data));

app.use(express.json());


app.use('/build', async (req, res) => {
  // const breweriesJSON = readBrewery();
  // const statesJSON = readStates();
  // const stateAbbs = Object.keys(statesJSON);
  // breweriesJSON.forEach(brewery => {
  //   const stateAbb = stateAbbs.find(state => statesJSON[state].name === brewery.state);
  //   const brewStates = readBrewStates();
  //   brewStates[stateAbb] = {
  //     ...brewStates[stateAbb], 
  //     "breweries" : [
  //       ...brewStates[stateAbb]["breweries"], 
  //       brewery
  //     ]
  //   };
  //   // writeBrewStates(brewStates);
  // });
  // console.log("done!");
  const brewStates = readBrewStates();
  res.json(brewStates["GA"]);
});




app.listen(3001);