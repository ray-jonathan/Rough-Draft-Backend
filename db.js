module.exports = require('pg-promise')({
	query: ({ query: q }) => {
		// console.log(q);
	},
})({
	host: 'localhost',
	database: 'roughdraft',
});
