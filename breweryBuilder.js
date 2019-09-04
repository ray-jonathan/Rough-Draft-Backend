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
module.exports = async (addressParts) => {
  const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&searchtext=${addressParts}`
  try{
    const {data : {Response : {View : [{Result : [{Location:{DisplayPosition : {Latitude, Longitude}, Address : {HouseNumber, Street, City, State, PostalCode}}}]}]}}} = await axios.get(url);
    return {HouseNumber, Street, City, State, PostalCode, Latitude, Longitude};
    // const {data : {Response : {View}}} = await axios.get(url);
    // return View[0];
  }
  catch(err){
    // console.log(err);
    return null;
  }
}


