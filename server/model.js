const path = require('path');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const db = require(path.join(__dirname, '..', 'db', 'index.js'));

function getBookingData(id, res) {
  console.log('in model..', id);

  const results = {
    bookedDates: [],
    dateRestrictions: undefined,
    discount_rate: undefined,
    discount_measure: undefined,
    bedrooms: []
  };

  db.Listing.findAll({
    attributes: ['discount_rate', 'discount_measure'],
    where: { id },
    include: [
      {
        model: db.UADays,
        attributes: ['ua_date'],
        where: {
          ua_date: { [Op.gte]: new Date() }
        }
      },
      { model: db.MinMax },
      {
        model: db.Bedrooms,
        attributes: ['numBeds', 'bedType']
      }
    ],
    order: [[{ model: db.UADays, as: 'ua_date' }, 'ua_date']]
  })
    .then(UAres => {
      const data = UAres[0].dataValues;
      const uaRes = data.UnavailableDates;
      const bedrooms = data.Bedrooms;
      results.discount_rate = data.discount_rate;
      results.discount_measure = data.discount_measure;
      results.dateRestrictions = data.MinMaxDay.dataValues;

      for (let i = 0; i < uaRes.length; i++) {
        results.bookedDates.push(uaRes[i].dataValues.ua_date);
      }

      for (let x = 0; x < bedrooms.length; x++) {
        results.bedrooms.push(bedrooms[x].dataValues);
      }
      res.send(results);
    })
    .catch(err => {
      console.log('error from get query', err);
    });
}
getBookingData(3);
module.exports.getBookingData = getBookingData;
