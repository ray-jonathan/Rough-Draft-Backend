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
      }
    };
    // const regex = RegExp("[A-Za-z0-9\-\_]+");
    // regex.test()
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

  // {
  //   "id": 2,
  //   "name": "Avondale Brewing Co",
  //   "brewery_type": "micro",
  //   "street": "201 41st St S",
  //   "city": "Birmingham",
  //   "state": "Alabama",
  //   "postal_code": "35222-1932",
  //   "country": "United States",
  //   "longitude": "-86.774322",
  //   "latitude": "33.524521",
  //   "phone": "2057775456",
  //   "website_url": "http://www.avondalebrewing.com",
  //   "updated_at": "2018-08-23T23:19:57.825Z",
  //   "tag_list": []
  // }
});



app.listen(3001);
