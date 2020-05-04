const express = require("express"),
  router = express.Router(),
  path = require("path"),
  passport = require("passport");

const User = require("../models/user");

router.get("/", (req, res) => {
  res.redirect("/blogs");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
    }),
    req.body.password,
    (err, user) => {
      if (err || !user) {
        console.log(err);
        req.flash("error", err.message);
        return res.render("auth/register");
      }

      passport.authenticate("local")(req, res, () => {
        // req.flash("success", `Welcome to YelpCamp ${user.username}`);
        res.redirect("/blogs");
      });
    }
  );
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/blogs");
});

module.exports = router;
