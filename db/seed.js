var mysql = require("mysql");
var db = require("./index.js");
var seedData = require("./seed_data.js");
var Sequelize = require("sequelize");

/***************** Inserts *****************/
/*****************************************/

function insertSeedData(data, table) {
	var model;
	if (table === "listing") {
		model = db.Listing;
	} else if (table === "minmax") {
		model = db.MinMax;
	} else {
		model = db.UADays;
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
