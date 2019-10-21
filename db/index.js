var mysql = require("mysql");
var Sequelize = require("sequelize");

//database, username, pass
const sequelize = new Sequelize("siestaNbrekkie", "root", "", {
	host: "localhost",
	dialect: "mysql"
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Sequelize Connection has been established successfully.");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

/***************** MODELS *****************/
/*****************************************/
const Listing = sequelize.define(
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
		},
		discount_rate: {
			type: Sequelize.DOUBLE,
			allowNull: true
		},
		discount_measure: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	},
	{ timestamps: false }
);

const MinMax = sequelize.define(
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
const UADays = sequelize.define(
	"UnavailableDates",
	{
		ua_date: Sequelize.DATEONLY,
		listing_id: Sequelize.INTEGER
	},
	{ timestamps: false }
);

Listing.hasMany(UADays, { foreignKey: "listing_id", sourceKey: "id" });
UADays.belongsTo(Listing, { foreignKey: "listing_id", targetKey: "id" });

Listing.belongsTo(MinMax, { foreignKey: "listing_id", sourceKey: "id" });
Listing.hasOne(MinMax, { foreignKey: "listing_id", sourceKey: "id" });

module.exports.sequelize = sequelize;
module.exports.Listing = Listing;
module.exports.MinMax = MinMax;
module.exports.UADays = UADays;
