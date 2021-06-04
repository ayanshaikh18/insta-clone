var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReplySchema = new Schema({
  replyBy: {
    type: String,
    required: true,
  },
  replyText: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

var CommentSchema = new Schema({
  commentBy: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  replies: {
    type: Array(ReplySchema),
  },
});

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
});

var PostSchema = new Schema({
  postedBy: {
    type: UserSchema,
    required: true,
  },
  caption: {
    type: String,
    required: false,
    default: "",
  },
  postedImage: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: Array(CommentSchema),
    default: [],
  },
  likedBy: {
    type: Array(String),
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
