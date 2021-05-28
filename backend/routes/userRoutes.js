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
  "/acceptFriendRequest/:id",
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

module.exports = router;
