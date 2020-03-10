/// Core ExpressJS Router file

const express = require("express");
const { e_app } = require("./index");
const { dir } = require("../../index");

const router = express.Router();

router.use("/", (req, res) => {
  res.sendFile("/public/index.html");
});

router.use("/exam", (req, res) => {
  res.sendFile("/public/test.html");
});

router.use("/review", (req, res) => {
  /// TO DO: Update this
  res.sendFile("/public/test.html");
});

module.exports = {
  router
};
