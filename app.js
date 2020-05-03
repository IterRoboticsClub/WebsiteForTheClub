require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
(expressSantizer = require("express-sanitizer")),
  (methodOverride = require("method-override"));

const blogRoutes = require("./routes/blog"),
  authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(expressSantizer());
app.use(methodOverride("_method"));

app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("===DB Connected===");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000);
