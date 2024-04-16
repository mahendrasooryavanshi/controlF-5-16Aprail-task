require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000;

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", (req, res) => {
  res.send("server is working");
});
app.use(require("./router/api.router"));
app.listen(PORT);
console.log("server is working at http://localhost:3000");
