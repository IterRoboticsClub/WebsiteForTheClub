const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  author: String,
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
