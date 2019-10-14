const express = require("express");
const path = require("path");
var router = require("./router.js");
var model = require("./model.js");
const app = express();
const port = 3000;

// app.use("/", router.router);

app.use("/rooms/:id", express.static(path.join(__dirname, "..", "public")));

app.get("/:id", router.router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
