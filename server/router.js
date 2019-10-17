var express = require('express');
var model = require('./model.js');
var router = express.Router();
const path = require('path');

router.get('/:id?', (req, res) => {
  var id = req.params.id;
  var modelRes = model.getBookingData(req.params.id, res);
});

router.post('/:id?', (req, res) => {
  var id = req.params.id;
  // var modelRes = model.getBookingData(req.params.id, res);
});

module.exports.router = router;
