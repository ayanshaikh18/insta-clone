var express = require("express");
var router = express.Router();
var userHandlers = require("../controllers/userController");
var verifyTokenMiddleWare = require("../middlewares/VerifyToken");

router.get("/check", verifyTokenMiddleWare.verifyToken, (req, res, next) => {
  res.json({ msg: "Working" });
});

router.post("/register", userHandlers.register);
router.post("/login", userHandlers.login);
router.post(
  "/sendFriendRequest/:name",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.sendFriendRequest
);
router.post(
  "/acceptFriendRequest/:name",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.acceptFriendRequest
);
router.delete(
  "/deleteFriendRequest/:id",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.deleteFriendRequest
);
router.get(
  "/getSuggestions/",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.suggestionList
);
router.get("/getLoggedinUser", verifyTokenMiddleWare.verifyToken, (req, res) =>
  res.json(req.user)
);
router.get(
  "/getFrdRequests/",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.getFrdRequests
);
router.post(
  "/unfollowUser/:name",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.unfollowuser
);
router.get(
  "/:username",
  verifyTokenMiddleWare.verifyToken,
  userHandlers.getUserProfile
);

module.exports = router;
