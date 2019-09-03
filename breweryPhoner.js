const fs = require('fs');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));


const brews = readBrewery();
// Validate the phone numbers
const fixedBrews = brews.map((brew, i)=>{
  switch (i){
    case 556:
        brew.phone = "6086245577";
        break;
    case 698:
        brew.phone = "9077832739";
        break;
    case 713:
        brew.phone = "";
        break;
    case 942:		
        brew.phone = "7146602537";
        break;
    case 1410:
        brew.phone = "";
        break;
    case 1631:
        brew.phone = "7203604782";
        break;
    case 2014:
        brew.phone = "3214994323";
        break;
    case 2558:
        brew.phone = "5153371182";
        break;
    case 2682:
        brew.phone = "8592910036";
        break;
    case 2742:
        brew.phone = "5125601378";
        break;
    case 2812:
        brew.phone = "2074062112";
        break;
    case 3057:
        brew.phone = "6166962337";
        break;
    case 3077:
        brew.phone = "5866973300";
        break;
    case 3299:
        brew.phone = "2314218977";
        break;
    case 3746:
        brew.phone = "7324558047";
        break;
    case 4054:
        brew.phone = "3154682337";
        break;
    case 4143:
        brew.phone = "6075462337";
        break;
    case 4749:
        brew.phone = "5033524150";
        break;
    case 5581:
        brew.phone = "5403569056";
        break;
    case 5672:
        brew.phone = "4349462337";
        break;
    case 6103:
        brew.phone = "7158422337";
        break;
    case 6474:
        brew.phone = "8592615600";
        break;
    case 6805:
        brew.phone = "2533832739";
        break;
    default:
        break;
  }
  return brew;
});
// writeBrewery(fixedBrews);