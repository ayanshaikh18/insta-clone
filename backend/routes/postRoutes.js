var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var verifyTokenMiddleWare = require("../middlewares/VerifyToken");

router.get(
  "",
  verifyTokenMiddleWare.verifyToken,
  postController.getPostsForLoggedinUser
);
router.post("", verifyTokenMiddleWare.verifyToken, postController.Post);
router.post(
  "/:postId/comment",
  verifyTokenMiddleWare.verifyToken,
  postController.postComment
);
router.post(
  "/:postId/comment/:commentId/reply",
  verifyTokenMiddleWare.verifyToken,
  postController.postReply
);
router.post(
  "/:postId/like",
  verifyTokenMiddleWare.verifyToken,
  postController.likePost
);
router.get(
  "/:postId",
  verifyTokenMiddleWare.verifyToken,
  postController.getPost
);

module.exports = router;
