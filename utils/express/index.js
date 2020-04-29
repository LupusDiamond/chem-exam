/// Core ExpressJS file

// Importing packages
const { express } = require("../packages");

// Creating the express instance
const e_app = express();
const port = process.env.PORT || 3000;

// Booting the server on port 3000
e_app.listen(port, () => console.log("Server up and running!"));

module.exports = {
  e_app
};

// Load ExpressJS middleware
require("./middleware");
