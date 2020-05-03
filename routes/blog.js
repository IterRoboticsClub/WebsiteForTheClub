const express = require("express"),
  router = express.Router();

const Blog = require("../models/blog");

// RESTful ROUTES

router.get("/", (req, res) => {
  res.redirect("/blogs");
});

// INDEX Route
router.get("/", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      return res.status(404).json({
        error: "Could not get blog posts",
      });
    } else {
      res.render("index", { blogs });
    }
  });
});

// NEW Route
router.get("/new", (req, res) => {
  res.render("new");
});

// CREATE Route
router.post("/", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.redirect("/blogs/new");
    }

    res.redirect("/blogs");
  });
});

// SHOW Route
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.status(404).json({
        error: "Could not find the blog",
      });
    }

    res.render("show", { blog });
  });
});

// EDIT Route
router.get("/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.status(404).json({
        error: "Could not find the blog",
      });
    }

    res.render("edit", { blog });
  });
});

// UPDATE Route
router.put("/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    if (err) {
      res.status(404).json({
        error: "Could not find the blog",
      });
    }

    res.redirect("/blogs/" + req.params.id);
  });
});

// DELETE Route
router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(400).json({
        error: "Could not delete the blog",
      });
    }

    res.redirect("/blogs");
  });
});

module.exports = router;
