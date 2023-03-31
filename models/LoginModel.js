const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  name: String,
  hash: String,
  email: String,
});

module.exports = mongoose.model("Login", LoginSchema);
