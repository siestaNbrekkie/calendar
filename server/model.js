const path = require('path');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require(path.join(__dirname, '..', 'db', 'index.js'));

function getBookingData(id, res) {
	console.log('in model..', id);

	var results = {
		bookedDates: [],
		dateRestrictions: undefined,
		discount_rate: undefined,
		discount_measure: undefined
	};

	db.Listing.findAll({
		attributes: ['discount_rate', 'discount_measure'],
		where: { id: id },
		include: [
			{
				model: db.UADays,
				attributes: ['ua_date'],
				where: {
					ua_date: { [Op.gte]: new Date() }
				}
			},
			{ model: db.MinMax }
		],
		order: [[{ model: db.UADays, as: 'ua_date' }, 'ua_date']]
	})
		.then(UAres => {
			var data = UAres[0].dataValues;
			var uaRes = data.UnavailableDates;
			results.discount_rate = data.discount_rate;
			results.discount_measure = data.discount_measure;
			results.dateRestrictions = data.MinMaxDay.dataValues;
			for (var i = 0; i < uaRes.length; i++) {
				results.bookedDates.push(uaRes[i].dataValues.ua_date);
			}

			res.send(results);
		})
		.catch(err => {
			console.log('error from get query', err);
		});
}

module.exports.getBookingData = getBookingData;
