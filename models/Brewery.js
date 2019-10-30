const db = require('../db');

class Brewery {
	constructor({
		name,
		brewery_type,
		street,
		city,
		state,
		postal_code,
		country,
		latitude,
		longitude,
		phone,
		website_url,
		img = null,
	}) {
		(this.name = name),
			(this.brewery_type = brewery_type),
			(this.street = street),
			(this.city = city),
			(this.us_state = state),
			(this.postal_code = postal_code),
			(this.country = country),
			(this.latitude = latitude),
			(this.longitude = longitude),
			(this.phone = phone),
			(this.website_url = website_url),
			(this.img = img);
	}

	async save() {
		return await db.one(
			'insert into breweries (name, brewery_type,street, city, us_state, postal_code, country, latitude, longitude, phone, website_url, img) values ($1, $2, $3, $4, (select us_state from us_states where full_name = $5), $6, $7, $8, $9, $10, $11, $12) returning id',
			[
				this.name,
				this.brewery_type,
				this.street,
				this.city,
				this.us_state,
				this.postal_code,
				this.country,
				this.latitude,
				this.longitude,
				this.phone,
				this.website_url,
				this.img,
			],
		);
	}
}

module.exports = Brewery;
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

// {
//   name,
//   brewery_type,
//   street,
//   city,
//   us_state,
//   postal_code,
//   country,
//   latitude,
//   longitude,
//   phone,
//   website_url,
//   img,
// }
