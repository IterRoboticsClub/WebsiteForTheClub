const express = require("express"),
  router = express.Router(),
  path = require("path"),
  passport = require("passport");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {});

module.exports = router;
