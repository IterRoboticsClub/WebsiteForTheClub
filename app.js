const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer");

const blogRoutes = require("./routes/blog");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use("/blogs", blogRoutes);

mongoose
  .connect("mongodb://localhost/irc_blog", {
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

app.listen(5000);
