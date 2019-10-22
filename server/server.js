const express = require('express');
const path = require('path');
const router = require('./router.js');

const app = express();
const port = 3004;

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/rooms/:id', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/:id', router.router);
app.post('/api/:id', router.router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
