/// Core file for ExpressJS middleware

// Importing packages
const { express, bodyparser } = require("../packages");

// Importing external files required
const { e_app } = require("./index");
e_app.use(bodyparser.json());
e_app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
const { router } = require("./router");

// Use Front-End from the public folder
e_app.use(express.static("public"));
