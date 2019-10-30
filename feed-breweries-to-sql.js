// const db =
const Brewery = require('./models/Brewery');
const fs = require('fs');
const states = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DC',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];
states.forEach((state, i) => {
	const { breweries } = JSON.parse(fs.readFileSync(`./states/${state}.json`))[
		state
	];
	breweries.forEach(async brewery => {
		const brew = new Brewery(brewery);
		const { id } = await brew.save();
		console.log(id);
	});
});

// {
//   id: 7999,
//   name: 'Bitter Creek Brewing Co',
//   brewery_type: 'brewpub',
//   street: '604 Broadway St',
//   city: 'Rock Springs',
//   state: 'Wyoming',
//   postal_code: '82901-6348',
//   country: 'United States',
//   longitude: '-109.21812427755',
//   latitude: '41.5868390443439',
//   phone: '3073624782',
//   website_url: 'http://www.bittercreekbrewing.com',
//   updated_at: '2018-08-24T16:46:39.138Z',
//   tag_list: [],
//   img: ""
// }
