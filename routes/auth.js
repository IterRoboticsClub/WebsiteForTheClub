const express = require("express"),
  router = express.Router(),
  path = require("path"),
  passport = require("passport"),
  Joi = require("@hapi/joi");

const User = require("../models/user");
const { checkLoginInfo } = require("../middleware");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(10).max(12).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  // Validate the data
  const { error } = schema.validate(req.body);
  if (error) {
    const msg = error.details[0].message;
    req.flash("error", msg);
    console.log(msg);
    const { name, username, email } = req.body;
    return res.redirect("/register");
  }

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
  checkLoginInfo,
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login",
    failureFlash: "Username and password do not match",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/blogs");
});

module.exports = router;
