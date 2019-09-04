const fs = require('fs');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));

const brews = readBrewery();
const nameBugs = [87, 878, 1226, 1874, 1929, 2117, 2652, 3360, 3636, 3710, 3823, 3830, 3893, 4169, 4416, 4924, 5086, 5293, 5401, 5599, 6191, 6580, 6713];
const streetBugs = [1290, 2104, 3534, 5083, 6178, 6179];
const newBrews = brews.map((brew, i) => {
  // Name fixes
  if (nameBugs.includes(i)){
    switch (i){
      case 87: 
        brew.name = "Woods Cerveceria";
        break;
      case 878: 
        brew.name = "Anheuser-Busch Inc Fairfield";
        break;
      case 1226: 
        brew.name = "Miner's Alley Brewing Company";
        break;
      case 1874: 
        brew.name = "38deg-75deg Brewing";
        break;
      case 1929: 
        brew.name = "Anheuser-Busch Inc Jacksonville";
        break;
      case 2117: 
        brew.name = "Anheuser-Busch Inc Cartersville";
        break;
      case 2652: 
        brew.name = "Grinders High Noon Brewery";
        break;
      case 3360: 
        brew.name = "Giesenbrau Bier Co";
        break;
      case 3636: 
        brew.name = "Battle Born Beer";
        break;
      case 3710: 
        brew.name = "Anheuser-Busch Inc Newark";
        break;
      case 3823: 
        brew.name = "Blu Dragonfly Brewing";
        break;
      case 3830: 
        brew.name = "The Pecan Grill and Brewery";
        break;
      case 3893: 
        brew.name = "Anheuser-Busch Inc Baldwinsville";
        break;
      case 4169: 
        brew.name = "Winner's Circle Brewing Company";
        break;
      case 4416: 
        brew.name = "Anheuser-Busch Inc Columbus";
        break;
      case 4924: 
        brew.name = "Burgh'ers Brewing";
        break;
      case 5086: 
        brew.name = "Boser Geist Brewing Co";
        break;
      case 5293: 
        brew.name = "Anheuser-Busch Inc Houston";
        break;
      case 5401: 
        brew.name = "Kunstler Brewing";
        break;
      case 5599: 
        brew.name = "Anheuser-Busch Inc Williamsburg";
        break;
      case 6191: 
        brew.name = "R'Noggin Brewing";
        break;
      case 6580: 
        brew.name = "Anheuser-Busch Inc Merrimack";
        break;
      case 6713: 
        brew.name = "Edmund's Oast Brewing Co.";
        break;
    }
  }

  // Address fixes
  if (streetBugs.includes(i)){
    switch(i){
      case 1290:
        brew.street = "7037 Laurel Canyon Boulevard";
        break;
      case 2104:
        brew.street = "544 1st Ave N";
        break;
      case 3534:
        brew.street = "111 E Oak St #1a";
        break;
      case 5083:
        brew.street = "2800 N Reading Rd";
        break;
      case 6178:
        brew.street = "110 Wisconsin Dells Pkwy. S.";
        brew.city = "Wisconsin Dells";
        brew.state = "Wisconsin";
        brew.postal_code = "53965";
        brew.latitude = "43.628055";
        brew.longitude = "-89.771693";
        break;
      case 6179:
        brew.street = "7791 WI-42";
        break;
    }
  }

  return brew;
});
writeBrewery(newBrews);
