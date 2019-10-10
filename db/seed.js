var mysql = require("mysql");
var db = require("./index.js");
var seedData = require("./seed_data.js");
var Sequelize = require("sequelize");

/***************** MODELS *****************/
/*****************************************/
const Listing = db.sequelize.define(
	"Listing",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		short_desc: {
			type: Sequelize.STRING,
			allowNull: true
		},
		city: {
			type: Sequelize.STRING,
			allowNull: true
		},
		country: {
			type: Sequelize.STRING,
			allowNull: true
		}
	},
	{ timestamps: false }
);

const MinMax = db.sequelize.define(
	"MinMaxDays",
	{
		sunday_min: { type: Sequelize.INTEGER },
		monday_min: { type: Sequelize.INTEGER },
		tuesday_min: { type: Sequelize.INTEGER },
		wednesday_min: { type: Sequelize.INTEGER },
		thursday_min: { type: Sequelize.INTEGER },
		friday_min: { type: Sequelize.INTEGER },
		saturday_min: { type: Sequelize.INTEGER },
		max_days: { type: Sequelize.INTEGER },
		listing_id: { type: Sequelize.INTEGER }
	},
	{ timestamps: false }
);

const UADays = db.sequelize.define(
	"UnavailableDates",
	{
		ua_date: Sequelize.DATEONLY,
		listing_id: Sequelize.INTEGER
	},
	{ timestamps: false }
);

/***************** Inserts *****************/
/*****************************************/

function insertSeedData(data, table) {
	var model;
	if (table === "listing") {
		model = Listing;
	} else if (table === "minmax") {
		model = MinMax;
	} else {
		model = UADays;
	}

	Promise.all(
		data.map(item => {
			return model
				.create(item)
				.then(succ => {
					console.log("inserted with Sequelize..", table);
				})
				.catch(err => {
					console.log("err inserting with sequilze..", err);
				});
		})
	)
		.then(res => {
			console.log("finished inserting seed data for: ", table);
			return "success";
		})
		.catch(err => {
			console.log("error inserting seedData for: ", table);
			return "error";
		});
}

insertSeedData(seedData.listing, "listing");
insertSeedData(seedData.uaData, "uaDays");
insertSeedData(seedData.minmax, "minmax");
