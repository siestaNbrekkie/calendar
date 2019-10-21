var express = require("express");
var model = require("./model.js");
var router = express.Router();

router.get("/:id?", (req, res) => {
	var id = req.params.id;
	var modelRes = model.getBookingData(req.params.id, res);
});

module.exports.router = router;
