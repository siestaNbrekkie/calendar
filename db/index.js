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
		console.log("Connection has been established successfully.");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

module.exports.sequelize = sequelize;
