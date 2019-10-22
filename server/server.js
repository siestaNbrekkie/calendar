const express = require('express');
const path = require('path');
const router = require('./router.js');

const app = express();
const port = 3000;

app.use('/rooms/:id', express.static(path.join(__dirname, '..', 'public')));

app.get('/:id', router.router);
app.post('/:id', router.router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
