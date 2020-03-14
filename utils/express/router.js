/// Core ExpressJS Router file

// Importing packages
const { express, path } = require("../packages");
const { dir } = require("../../index");

// Create the expressjs router
const router = express.Router();

// All routes
router.get("/", (req, res) => {
  res.sendFile(path.join(dir, "/public/index.html"));
});

router.get("/exam", (req, res) => {
  res.sendFile(path.join(dir, "/public/exam.html"));
});

router.get("/review", (req, res) => {
  /// TO DO: Update this
  res.sendFile(path.join(dir, "/public/review.html"));
});

router.get("/platform", (req, res) => {
  res.sendFile(path.join(dir, "/public/platform.html"));
});

router.post("/addQuestion", (req, res) => {
  console.log(req.body);
});

module.exports = {
  router
};
