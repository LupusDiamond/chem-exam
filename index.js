/// Core App File

const path = require("path");

// Root folder directory
const dir = __dirname;

module.exports = {
  dir
};

// Loading ExpressJS files
const { e_app } = require("./utils/express/index");
