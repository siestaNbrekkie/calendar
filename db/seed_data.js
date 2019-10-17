var moment = require('moment');
var faker = require('faker');

// console.log(faker.address.city());
// console.log(faker.address.country());
// console.log(faker.lorem.sentences());

var listing = [];
var minmax = [];
var uaData = [];

for (var i = 1; i < 101; i++) {
	var listingData = {
		short_desc: faker.lorem.words(3),
		city: faker.address.city(),
		country: faker.address.country(),
		discount_rate: (Math.random() * (0.35 - 0.1) + 0.1).toFixed(2),
		discount_measure: Math.floor(Math.random() * 35)
	};

	var minmaxData = {
		sunday_min: Math.floor(Math.random() * 5),
		monday_min: Math.floor(Math.random() * 3),
		tuesday_min: Math.floor(Math.random() * 3),
		wednesday_min: Math.floor(Math.random() * 3),
		thursday_min: Math.floor(Math.random() * 3),
		friday_min: Math.floor(Math.random() * 5),
		saturday_min: Math.floor(Math.random() * 5),
		max_days: Math.floor(Math.random() * (35 - 7) + 7),
		listing_id: i
	};

	listing.push(listingData);
	minmax.push(minmaxData);
}

for (var x = 1; x < 101; x++) {
	var numBookedOccurances = Math.floor(Math.random() * 14);

	for (var z = 0; z < numBookedOccurances; z++) {
		var totalNumDays = Math.floor(Math.random() * (5 - 2) + 2);
		var firstDay = faker.date.future(0.5);
		for (var day = 0; day < totalNumDays; day++) {
			var data = {
				ua_date: moment(firstDay)
					.add(day, 'd')
					.format('YYYY-MM-DD'),
				listing_id: x
			};
			uaData.push(data);
		}
	}
}

/*
example:
listing = [
	{
		short_desc: "Beautiful contemporary villa in Pedregal",
		city: "Cabo San Lucas",
		country: "Mexico",
		discount_rate: 0.03,
		discount_measure: 7
	}
];

minmax = [
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
	}
];

uaData = [
	{
		ua_date: moment("2019-09-1", "YYYY-MM-DD"),
		listing_id: 2
	}]
*/
module.exports.listing = listing;
module.exports.minmax = minmax;
module.exports.uaData = uaData;
