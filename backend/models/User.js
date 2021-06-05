var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var UserScheme = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
    },
    bio: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    profilePic: {
      type: String,
      default: null,
    },
    displayName: {
      type: String,
      default: "",
    },
    website: {
      type: String,
    },
  },
  { timestamp: true }
);

UserScheme.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("User", UserScheme);
