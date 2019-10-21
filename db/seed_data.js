var moment = require("moment");

var listing = [
	{
		short_desc: "Beautiful contemporary villa in Pedregal",
		city: "Cabo San Lucas",
		country: "Mexico",
		discount_rate: 0.03,
		discount_measure: 7
	},
	{
		short_desc: "The Joshua Tree House",
		city: "Joshua Tree",
		country: "USA",
		discount_rate: 0.1,
		discount_measure: 14
	}
];

var minmax = [
	{
		sunday_min: 3,
		monday_min: 2,
		tuesday_min: 1,
		wednesday_min: 2,
		thursday_min: 3,
		friday_min: 3,
		saturday_min: 3,
		max_days: 14,
		listing_id: 1
	},
	{
		sunday_min: 3,
		monday_min: 3,
		tuesday_min: 3,
		wednesday_min: 3,
		thursday_min: 3,
		friday_min: 3,
		saturday_min: 3,
		max_days: 30,
		listing_id: 2
	}
];

var uaData = [
	{
		ua_date: moment("2019-09-1", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-09-2", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-09-3", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-09-4", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-10-23", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-10-24", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-10-25", "YYYY-MM-DD"),
		listing_id: 2
	},
	{
		ua_date: moment("2019-10-26", "YYYY-MM-DD"),
		listing_id: 2
	}
];

module.exports.listing = listing;
module.exports.minmax = minmax;
module.exports.uaData = uaData;
