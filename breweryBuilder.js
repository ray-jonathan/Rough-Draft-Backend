const axios = require('axios');
const fs = require('fs');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const writeBrewery = (data) => fs.writeFileSync('./breweries.json', JSON.stringify(data));
require('dotenv').config();

// module.exports = async () => {
//   for(let i = 1; i < 162; i++){
//     setTimeout(async()=>{
//       console.log(`page #${i}`);
//       const {data} = await axios.get(`https://api.openbrewerydb.org/breweries?page=${i}&per_page=50`);
//       const comprehensiveData = [...readBrewery(), ...data];
//       writeBrewery(comprehensiveData);
//       return data;
//     }, i*1000);
//   }
//   return;
// };
module.exports = (addressParts) => {
  const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&searchtext=${addressParts}`
  const result = axios.get(url);
  // const {data: {View}} = axios.get(url);
  // const {Result}= View[0];
  // const {Location} = Result[0];
  // const {NavigationPosition, Address : {HouseNumber, Street, City, State}} = Location;
  // const {Latitude, Longitude} = NavigationPosition[0];
  // return {HouseNumber, Street, City, State, Latitude, Longitude};
  return result;
}

