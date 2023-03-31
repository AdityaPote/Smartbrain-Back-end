const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  hash: String,
  email: String,
  entries: Number,
  joined: Date,
});

module.exports = mongoose.model("User", UserSchema);
