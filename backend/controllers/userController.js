var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const Post = require("../models/Post");

exports.register = (req, res) => {
  var newUser = new User(req.body);
  console.log(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      if (err.code == 11000) res.json({ error: "Username already Taken" });
      else {
        res.status(401).send({
          msg: err,
        });
      }
    } else {
      user.hash_password = undefined;
      let payload = { _id: newUser._id };
      let token = jwt.sign(payload, "secretkey");
      res.json({ token: token });
    }
  });
};

exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json({ error: err });
      } else {
        if (!user || !user.comparePassword(req.body.password)) {
          res.json({ error: "Invalid Credentials" });
        } else {
          let payload = { _id: user._id };
          let token = jwt.sign(payload, "secretkey");
          console.log(token);
          res.json({ token: token, user: user });
        }
      }
    }
  );
};

exports.sendFriendRequest = async (req, res) => {
  var user = req.user;
  console.log(user);
  var request = new FriendRequest({
    from: user.name,
    to: req.params.name,
  });
  request.save((err, request_data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        msg: "Something Went Wrong!!!",
      });
    } else {
      res.send({ request_data });
    }
  });
};

exports.acceptFriendRequest = (req, res) => {
  console.log(req.params.name);
  console.log(req.user.name);
  FriendRequest.findOne(
    {
      $and: [{ from: req.params.name }, { to: req.user.name }],
    },
    async (err, request) => {
      console.log(request);
      if (err) {
        console.log(err);
        res.status(401).send(err);
      } else {
        await addToFollowers(req, res, request);
        await addToFollowing(req, res, request);
        res.send({ msg: "accepted" });
      }
    }
  );
};

const addToFollowers = (req, res, request) => {
  User.updateOne(
    { name: request.to },
    {
      $push: {
        followers: request.from,
      },
    },
    (err, suc) => {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Something Went Wrong!!!" });
      } else {
        FriendRequest.findByIdAndDelete({ _id: request._id }, (err) => {
          if (err) {
            console.log(err);
            res.status(500).send({ msg: "Something Went Wrong!!!" });
          }
        });
      }
    }
  );
};

const addToFollowing = (req, res, request) => {
  User.updateOne(
    { name: request.from },
    {
      $push: {
        following: request.to,
      },
    },
    (err, suc) => {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Something Went Wrong!!!" });
      } else {
        FriendRequest.findByIdAndDelete({ _id: request._id }, (err) => {
          if (err) {
            console.log(err);
            res.status(500).send({ msg: "Something Went Wrong!!!" });
          }
        });
      }
    }
  );
};

exports.deleteFriendRequest = (req, res) => {
  FriendRequest.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: "Something Went Wrong!!!" });
    }
    res.json({ msg: "deleted" });
  });
};

exports.findLoggedInUser = (req, res, cb) => {
  User.findOne(
    {
      _id: req.userId,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(401).send(err);
      }
      cb(user);
    }
  );
};

exports.suggestionList = (req, res) => {
  console.log(req.user.name);
  FriendRequest.find(
    {
      $or: [
        {
          from: req.user.name,
        },
        {
          to: req.user.name,
        },
      ],
    },
    (err, requests) => {
      if (err) {
        console.log(err);
        res.status(401).send(err);
      } else {
        let tos = requests.map((r) => r.to);
        let froms = requests.map((r) => r.from);
        User.find(
          {
            $and: [
              { name: { $nin: req.user.following } },
              { name: { $ne: req.user.name } },
              { name: { $nin: tos } },
              { name: { $nin: froms } },
            ],
          },
          (err, users) => {
            if (err) {
              console.log(err);
              res.status(401).send(err);
            } else {
              res.json(users);
            }
          }
        ).limit(4);
      }
    }
  );
};

exports.getFrdRequests = (req, res) => {
  FriendRequest.find(
    {
      to: req.user.name,
    },
    (err, requests) => {
      let froms = requests.map((r) => r.from);
      User.find(
        {
          name: { $in: froms },
        },
        {
          name: 1,
          displayName: 1,
          profilePic: 1,
        },
        (err, users) => {
          if (err) {
            console.log(err);
            res.status(401).send(err);
          } else {
            res.json(users);
          }
        }
      );
    }
  );
};

exports.unfollowuser = (req, res) => {
  User.updateOne(
    { _id: req.user._id },
    {
      $pull: {
        following: req.params.name,
      },
    },
    (err, suc) => {
      if (err) {
        res.status(400).send({ msg: "Something Went Wrong!!!" });
      } else {
        User.updateOne(
          { name: req.params.name },
          {
            $pull: {
              followers: req.user.name,
            },
          },
          (err, suc) => {
            if (err) {
              res.status(400).send({ msg: "Something Went Wrong!!!" });
            } else {
              res.json({ msg: "unfollowed" });
            }
          }
        );
      }
    }
  );
};

exports.getUserProfile = (req, res) => {
  let name = req.params.username;
  User.findOne({ name: name }, (err, user) => {
    if (err) {
      res.status(400).send({ msg: "Something Went Wrong!!!" });
    } else {
      if (!user) res.json({ msg: "Not Found" });
      else {
        Post.find({ "postedBy.name": name }, (err, posts) => {
          if (err) {
            res.status(400).send({ msg: "Something Went Wrong!!!" });
          } else {
            if (
              user.name == req.user.name ||
              user.followers.includes(req.user.name)
            ) {
              res.json({
                user: user,
                following: true,
                posts: posts,
                postsCnt: posts.length,
              });
            } else {
              res.json({
                user: user,
                following: false,
                postsCnt: posts.length,
              });
            }
          }
        });
      }
    }
  });
};

exports.getUsersDpAndDisplayNames = (req, res) => {
  User.find(
    { name: { $in: req.body.usernames } },
    {
      name: 1,
      displayName: 1,
      profilePic: 1,
    },
    (err, users) => {
      if (err) {
        console.log(err);
        res.status(401).send(err);
      } else {
        res.json(users);
      }
    }
  );
};
