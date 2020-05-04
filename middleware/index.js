const Blog = require("../models/blog"),
  User = require("../models/user");
exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Please log in first");
  return res.redirect("/login");
};

exports.checkBlogAuthor = function (req, res, next) {
  Blog.findById(req.params.id, (err, blog) => {
    if (err || !blog) {
      console.log(err);
      req.flash("error", "Sorry! This blog does not exist");
      return res.redirect("/blogs");
    } else if (blog.author.id.equals(req.user._id)) {
      next();
    } else {
      req.flash("error", "You do not have permission to do that");
      return res.redirect("back");
    }
  });
};
