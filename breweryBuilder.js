const axios = require('axios');
const fs = require('fs');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));

module.exports = async () => {
  for(let i = 1; i < 162; i++){
    setTimeout(async()=>{
      console.log(`page #${i}`);
      const {data} = await axios.get(`https://api.openbrewerydb.org/breweries?page=${i}&per_page=50`);
      const comprehensiveData = [...readBrewery(), ...data];
      writeBrewery(comprehensiveData);
      return data;
    }, i*1000);
  }
  return;
};