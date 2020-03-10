/// Core ExpressJS file

const express = require("express");
const path = require("path");

const { dir } = require("../../index");
const { router } = require("./router");

const e_app = express();

e_app.use(express.static("public"));

e_app.use("/", router);

e_app.listen(3000, () => console.log("Server up and running!"));

module.exports = {
  e_app
};
