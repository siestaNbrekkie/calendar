const express = require("express");
const path = require("path");
var router = require("./router.js");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", router.router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
