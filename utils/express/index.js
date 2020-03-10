/// Core ExpressJS file

// Importing packages
const { express } = require("../packages");

// Creating the express instance
const e_app = express();

// Booting the server on port 3000
e_app.listen(3000, () => console.log("Server up and running!"));

module.exports = {
  e_app
};

// Load ExpressJS middleware
require("./middleware");
