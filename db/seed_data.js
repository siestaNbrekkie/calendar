const moment = require('moment');
const faker = require('faker');

const listing = [];
const minmax = [];
const uaData = [];
const bedrooms = [];
function createData() {
  for (let i = 1; i < 101; i++) {
    const minmaxData = {
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

    const listingData = {
      short_desc: faker.lorem.words(Math.floor(Math.random() * 5)),
      city: faker.address.city(),
      country: faker.address.country(),
      discount_rate: (Math.random() * (0.35 - 0.1) + 0.1).toFixed(2),
      discount_measure: minmaxData.max_days
    };

    listing.push(listingData);
    minmax.push(minmaxData);
  }

  // UA Dates
  for (let x = 1; x < 101; x++) {
    const numBookedOccurances = Math.floor(Math.random() * (15 - 1) + 1);

    for (let z = 0; z < numBookedOccurances; z++) {
      const totalNumDays = Math.floor(Math.random() * (5 - 2) + 2);
      const firstDay = faker.date.future(0.5);
      for (let day = 0; day < totalNumDays; day++) {
        const data = {
          ua_date: moment(firstDay)
            .add(day, 'd')
            .format('YYYY-MM-DD'),
          listing_id: x
        };
        uaData.push(data);
      }
    }
  }

  // bedrooms
  for (let x = 1; x < 101; x++) {
    const numRooms = Math.floor(Math.random() * (6 - 1) + 1);

    for (let z = 0; z < numRooms; z++) {
      const totalNumBeds = Math.floor(Math.random() * (4 - 1) + 1);

      if (totalNumBeds === 1) {
        const bedType = Math.floor(Math.random() * (4 - 1) + 1);
        let bed;
        if (bedType === 1) {
          bed = 'queen';
        } else if (bedType === 2) {
          bed = 'double';
        } else {
          bed = 'king';
        }
        const data = {
          numBeds: 1,
          bedType: bed,
          listing_id: x
        };
        bedrooms.push(data);
      }

      bedrooms.push({
        numBeds: totalNumBeds,
        bedType: 'single',
        listing_id: x
      });
    }
  }
}

/*
example data:
listing = [
	{
		short_desc: "Beautiful contemporary villa in Pedregal",
		city: "Cabo San Lucas",
		country: "Mexico",
		discount_rate: 0.03,
		discount_measure: 14
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

module.exports.createData = createData;
module.exports.listing = listing;
module.exports.minmax = minmax;
module.exports.uaData = uaData;
module.exports.bedrooms = bedrooms;
