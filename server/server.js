const express = require('express');
const path = require('path');
const compression = require('compression');
const router = require('./router.js');

const app = express();
const port = 3004;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/rooms/:id', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/:id', router.router);
app.post('/api/:id', router.router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
