const express = require('express');
const app = express();
const fs = require('fs');

const buildBrew = require('./breweryBuilder');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));

app.use(express.json());


app.use('/build', async (req, res) => {
  const breweriesJSON = readBrewery();
  const allBreweriesHaveCoords = breweriesJSON.map(async brewery => {
    if(brewery.latitude) {
      return {
        ...brewery,
        name: unescape(encodeURIComponent(brewery.name)),
        street: unescape(encodeURIComponent(brewery.street)),
      };
    }
    let addressParts = `${brewery.street} ${brewery.city||null} ${brewery.state}`.trim();
    addressParts = unescape(encodeURIComponent(addressParts));
    addressParts = encodeURIComponent(addressParts);
    try{
      const {HouseNumber, Street, City, State, PostalCode, Latitude, Longitude} = await buildBrew(addressParts);
      return {
        ...brewery,
        street: brewery.street || `${HouseNumber} ${Street}`,
        city: brewery.city || City,
        state: brewery.state || State,
        postal_code: brewery.postal_code || PostalCode,
        latitude: Latitude,
        longitude: Longitude,
      };
    }
    catch(err){
      return null;
    }

  });
  Promise.all(allBreweriesHaveCoords).then(result => {
    const sanitized = result.filter(data => data);
    res.json(sanitized);
    writeBrewery(sanitized);
  });
});



app.listen(3001);