const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating the user schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
