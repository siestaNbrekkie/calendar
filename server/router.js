const express = require('express');
const model = require('./model.js');

const router = express.Router();

router.get('/:id?', (req, res) => {
  const { id } = req.params;
  const modelRes = model.getBookingData(req.params.id, res);
});

router.post('/:id?', (req, res) => {
  const { id } = req.params;
  console.log('got data for ', id);
  res.end();
});

module.exports.router = router;
