const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized req");
  }
  let token = req.headers.authorization;
  if (token == "null" || token == undefined) {
    return res.status(401).send("unauthorized req");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    return res.status(401).send("unauthorized req");
  }
  req.userId = payload._id;
  userController.findLoggedInUser(req, res, (user) => {
    req.user = user
    next()
  });
};
