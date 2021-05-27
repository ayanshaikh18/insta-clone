var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FriendRequestScheme = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FriendRequest", FriendRequestScheme);
