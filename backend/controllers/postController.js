const Post = require("../models/Post");
var User = require("../models/User");

exports.Post = (req, res) => {
  var newPost = new Post(req.body);
  newPost.save((err, post) => {
    if (err) {
      res.status(404).send({
        msg: err,
      });
    } else res.json(post);
  });
};

exports.getPostsForLoggedinUser = (req, res) => {
  var user = req.user;
  var start = req.query.start;
  Post.find(
    {
      $or: [
        { "postedBy.name": { $in: user.following } },
        { "postedBy.name": req.user.name },
      ],
    },
    null,
    { skip: parseInt(start), limit: 10, sort: { time: -1 } },
    (err, posts) => {
      if (err) {
        console.log(err);
        res.status(401).send(err);
      } else res.json(posts);
    }
  );
};

exports.postComment = (req, res) => {
  Post.updateOne(
    { _id: req.params.postId },
    {
      $push: {
        comments: req.body,
      },
    },
    (err, suc) => {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Something Went Wrong!!!" });
      } else res.send(suc);
    }
  );
};

exports.postReply = (req, res) => {
  Post.updateOne(
    {
      _id: req.params.postId,
      "comments._id": req.params.commentId,
    },
    {
      $push: {
        "comments.$.replies": req.body,
      },
    },
    (err, suc) => {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Something Went Wrong!!!" });
      } else res.send(suc);
    }
  );
};

exports.likePost = (req, res) => {
  Post.findOne(
    { $and: [{ _id: req.params.postId }, { likedBy: req.user.name }] },
    (err, post) => {
      if (err) {
        console.log(err);
        res.status(401).send(err);
      }
      console.log(post);
      if (post) {
        Post.updateOne(
          { _id: req.params.postId },
          { $pullAll: { likedBy: [req.user.name] } },
          (err, suc) => {
            if (err) {
              console.log(err);
              res.status(500).send({ msg: "Something Went Wrong!!!" });
            } else {
              console.log(suc);
              res.json({ msg: "Post Unliked" });
            }
          }
        );
      } else {
        Post.updateOne(
          { _id: req.params.postId },
          {
            $push: {
              likedBy: req.user.name,
            },
          },
          (err, suc) => {
            if (err) {
              console.log(err);
              res.status(500).send({ msg: "Something Went Wrong!!!" });
            } else {
              console.log(suc);
              res.json({ msg: "Post Liked" });
            }
          }
        );
      }
    }
  );
};

exports.getPost = (req, res) => {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: "Something Went Wrong!!!" });
    } else {
      res.json(post);
    }
  });
};
