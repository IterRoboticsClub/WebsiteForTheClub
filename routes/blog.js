const express = require("express"),
  router = express.Router();

const Blog = require("../models/blog");
const { isLoggedIn, checkBlogAuthor } = require("../middleware");

// RESTful ROUTES

// INDEX Route
router.get("/", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      return res.status(404).json({
        error: "Could not get blog posts",
      });
    } else {
      res.render("blogs/index", { blogs });
    }
  });
});

// NEW Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("blogs/new");
});

// CREATE Route
router.post("/", isLoggedIn, (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  let title = req.body.blog.title,
    body = req.body.blog.body,
    image = req.body.blog.image,
    author = {
      id: req.user._id,
      name: req.user.name,
    };

  const blog = new Blog({
    title,
    image,
    body,
    author,
  });

  blog.save((err, blog) => {
    if (err || !blog) {
      console.log(err);
    } else {
      console.log("Blog is saved in DB");
      req.flash("Success", "Your blog has been submitted successfully!");
      res.redirect("/blogs");
    }
  });
});

// SHOW Route
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err || !blog) {
      console.log(err);
      req.flash("error", "Sorry! This blog does not exist anymore");
      req.redirect("back");
    }

    res.render("blogs/show", { blog });
  });
});

// EDIT Route
router.get("/:id/edit", isLoggedIn, checkBlogAuthor, (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.status(404).json({
        error: "Could not find the blog",
      });
    }

    res.render("blogs/edit", { blog });
  });
});

// UPDATE Route
router.put("/:id", isLoggedIn, checkBlogAuthor, (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    if (err || !blog) {
      console.log(err);
      req.flash("error", "Sorry! Something went wrong.");
      return res.redirect("back");
    }

    req.flash("success", "Blog updated successfully!");
    res.redirect("/blogs/" + req.params.id);
  });
});

// DELETE Route
router.delete("/:id", isLoggedIn, checkBlogAuthor, (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      req.flash("error", "Sorry! Could not delete the blog");
      return res.redirect(`/blogs/${req.params.id}`);
    }

    req.flash("error", "Blog deleted successfully");
    res.redirect("/blogs");
  });
});

module.exports = router;
