const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const btoa = require('btoa');
const imageToBase64 = require('image-to-base64');

const buildBrew = require('./breweryBuilder');
const readBrewery = () => JSON.parse(fs.readFileSync('./breweries.json'));
const readStates = () => JSON.parse(fs.readFileSync('./states.json'));
const readBrewStates = () =>
	JSON.parse(fs.readFileSync('./brewery-by-state.json'));
const writeBrewery = data =>
	fs.writeFileSync('./breweries.json', JSON.stringify(data));
const writeBrewStates = data =>
	fs.writeFileSync('./brewery-by-state.json', JSON.stringify(data));

app.use(express.json());
function msleep(n) {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

app.use('/build', async (req, res, next) => {
	const breweryImages = JSON.parse(fs.readFileSync('images.json'));
	// 	const response = await axios.get(url, { responseType: 'arraybuffer' });
	// 	const base64 = `data:${response.headers['content-type']};base64,${btoa(
	// 		String.fromCharCode(...new Uint8Array(response.data)),
	// 	)}`;
	// 	console.log(
	// 		url.indexOf('cloudfront') >= 0 ? 'from cloudfront' : 'not from cloudfront',
	// 	);
	// 	// console.log(' ');
	// 	// console.log(base64);
	// 	console.log(' ');
	// 	console.log(' ');

	// 	res.send(`<img src=${base64} />`);
	const delay = interval =>
		new Promise(resolve => setTimeout(resolve, interval * 10));
	// console.log(breweryImages[22]);
	// const allImagesPromises = breweryImages.map(async ({ url }, i) => {
	// 	try {
	// 		// await delay(i);
	// 		msleep(1);
	// 		const response = await axios.get(url, {
	// 			responseType: 'arraybuffer',
	// 		});
	// 		const base64 = `data:${response.headers['content-type']};base64,${btoa(
	// 			String.fromCharCode(...new Uint8Array(response.data)),
	// 		)}`;
	// 		console.log('                 ', i);
	// 		return `<img src=${base64} />`;
	// 	} catch (err) {
	// 		console.log(i, ': ', url, ' === === === \n', err);
	// 		// console.log(i);
	// 		return null;
	// 	}
	// });
	// const allImages = await Promise.all(allImagesPromises);
	const allBreweryImages = await Promise.all(
		breweryImages.map(async brewery => {
			let newUrl;
			try {
				newUrl = await imageToBase64(brewery.url);
			} catch (err) {
				newUrl = null;
			}
			return { ...brewery, url: newUrl };
		}),
	);
	console.log(allBreweryImages);
	res.send('done');
});
app.timeout = 0;
app.listen(3001);

// const allStates = readBrewStates();
// const states = Object.keys(allStates);
// const allBreweries = states.map(state => {
//   return allStates[state].breweries.map(({ name, city }) => {
//     return { state, name, city };
//   });
// });
// const deepFlatten = arr =>
//   [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// const flatAllBreweries = deepFlatten(allBreweries);
// const delay = interval =>
//   new Promise(resolve => setTimeout(resolve, interval * 1001));
// const arrayOfPromises = await Promise.all(
//   flatAllBreweries.map(async ({ state, name, city }, i) => {
//     await delay(i);
//     console.log('done waiting!');
//     const { data } = await axios.get(
//       `https://www.brewbound.com/breweries/state/${state}/searchbyterm?searchTerm=${encodeURI(
//         name,
//       )}&displayOutOfBiz=False`,
//     );
//     const $ = cheerio.load(data);
//     const messyURL = $('div', '.breweries-list').attr('style');
//     try {
//       const url = messyURL.substring(
//         messyURL.lastIndexOf("('") + 2,
//         messyURL.lastIndexOf("')"),
//       );
//       return { state, name, city, url };

//     } catch (err) {
//       console.log(`Brewery: ${name}, in ${state}, had an issue: `, err);
//       console.log(' ');
//       return { state, name, city };
//     }
//   }),
// );

// fs.writeFileSync('./images.json', JSON.stringify(arrayOfPromises));
// res.json(arrayOfPromises);
