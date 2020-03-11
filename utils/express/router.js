/// Core ExpressJS Router file

// Importing packages
const { express, path } = require("../packages");
const { dir } = require("../../index");

// Create the expressjs router
const router = express.Router();

// All routes
router.use("/", (req, res) => {
  res.sendFile(path.join(dir, "/public/test.html"));
});

router.use("/exam", (req, res) => {
  res.sendFile(path.join(dir, "/public/test.html"));
});

router.use("/review", (req, res) => {
  /// TO DO: Update this
  res.sendFile(path.join(dir, "/public/test.html"));
});

module.exports = {
  router
};
