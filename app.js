require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
(expressSantizer = require("express-sanitizer")),
  (methodOverride = require("method-override")),
  (passport = require("passport")),
  (localStrategy = require("passport-local")),
  (flash = require("connect-flash"));

const blogRoutes = require("./routes/blog"),
  authRoutes = require("./routes/auth");

const User = require("./models/user");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSantizer());
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT Configuration
app.use(
  require("express-session")({
    secret: "Who knows what is this?!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FLASH Middleware
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("===DB Connected===");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000);
