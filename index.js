/// Core App File

const path = require("path");

// Root folder directory
const dir = __dirname;

module.exports = {
  dir
};

// Loading ExpressJS files
const { e_app } = require("./utils/express/index");
const { router } = require("./utils/express/router");

// Use the router
e_app.use("/", router);

e_app.get("/questions", (req, res) => {
  res.sendFile(path.join(__dirname, "/utils/exam/questions.json"));
});

require("./utils/platform/index");
