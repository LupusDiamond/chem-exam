/// Core file for ExpressJS middleware

// Importing packages
const { express } = require("../packages");

// Importing external files required
const { e_app } = require("./index");
const { router } = require("./router");

// Use Front-End from the public folder
e_app.use(express.static("public"));
