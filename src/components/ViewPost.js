import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { getPost, likePost, postComment } from "../services/postService";
import { useParams } from "react-router-dom";
import defaultDp from "../assets/images/default.jpg";
import { useHistory } from "react-router";
import { getLoggedInUser } from "../services/authService";
import { CommentBox, CommentInput } from "./Posts";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Container = styled.div`
  /* position: relative; */
  width: 70%;
  max-width: 80%;
  margin-top: 100px;
  background-color: #fff;
  display: flex;
  border-radius: 3px;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
  border: 1px solid #d9d9d9;
  max-height: 600px;
  height: auto;
`;

const PostImage = styled.img`
  position: relative;
  width: 60%;
  padding: 0;
  height: auto;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const CommentsContainer = styled.div`
  position: relative;
  width: 40%;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
  border-left: 1px solid #d9d9d9;
`;

const CommentContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 10px;
  margin-bottom: 10px;
  z-index: 1;
`;

const CommentDiv = styled.div`
  margin-left: 10px;
  & * {
    text-decoration: none;
    color: #000;
  }
`;

const UserDp = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const BottomDiv = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 3;
  border-top: 1px solid #d9d9d9;
  width: 100%;
`;

const Comment = (props) => {
  const convertDate = (dateString) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date(dateString);
    var day = date.getDay();
    var month = monthNames[date.getMonth()];
    var hour = date.getHours();
    var min = date.getMinutes();
    return day + " " + month + " " + hour + ":" + min;
  };

  return (
    <CommentContainer>
      <UserDp src={defaultDp} />
      <CommentDiv>
        <b>
          <Link to={`/profile/${props.comment.commentBy}`}>
            {props.comment.commentBy}
          </Link>
        </b>
        &nbsp;&nbsp;
        {props.comment.commentText}
        <br /> <br />
        <small style={{ color: "grey" }}>
          {convertDate(props.comment.time)}
        </small>
      </CommentDiv>
    </CommentContainer>
  );
};

const ViewPost = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const [loggedInUser, setLoggedInUser] = useState();
  const history = useHistory();
  const [commentText, setCommentText] = useState();
  const [postingComment, setPostingComment] = useState(false);

  useEffect(async () => {
    var fetchedPost = await getPost(postId);
    setPost(fetchedPost);
  });

  useEffect(async () => {
    var user = await getLoggedInUser();
    setLoggedInUser(user);
  }, []);

  const handlePostComment = async (event) => {
    event.preventDefault();
    setPostingComment(true);
    const comment = {
      commentBy: loggedInUser.name,
      commentText: commentText,
    };
    const data = await postComment(post._id, comment);
    setCommentText("");
    setPostingComment(false);
  };

  const likeUnlikePost = async (event) => {
    event.preventDefault();
    let element = event.target;
    if (element.classList.contains("fa-heart")) {
      element.classList.add("fa-heart-o");
      element.classList.remove("fa-heart");
    } else {
      element.classList.add("fa-heart");
      element.classList.remove("fa-heart-o");
    }
    const data = await likePost(post._id);
    const msg = data.msg;
    if (msg == "Post Unliked") {
      element.classList.add("fa-heart-o");
      element.classList.remove("fa-heart");
    } else {
      element.classList.add("fa-heart");
      element.classList.remove("fa-heart-o");
    }
  };

  return (
    <>
      <Navbar />
      {post && loggedInUser ? (
        <>
          <Wrapper>
            <Container>
              <PostImage src={post.postedImage} />
              <CommentsContainer>
                {/* Header */}
                <CommentContainer style={{ borderBottom: "1px solid #d3d3d3" }}>
                  <UserDp
                    src={
                      post.postedBy.profilePic
                        ? post.postedBy.profilePic
                        : defaultDp
                    }
                  />
                  <CommentDiv>
                    <b>
                      <Link to={`/profile/${post.postedBy.name}`}>
                        {post.postedBy.name}
                      </Link>
                    </b>
                  </CommentDiv>
                </CommentContainer>

                <div style={{maxHeight:"calc(100% - 220px)",overflowY:"auto"}}>
                  {/* Comments */}
                  {post.comments.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                  ))}
                </div>

                {/* Bottom Part */}
                <BottomDiv>
                  <div
                    style={{
                      fontSize: "25px",
                      paddingLeft: "20px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    {post.likedBy.includes(loggedInUser.name) ? (
                      <i className="fa fa-heart" onClick={likeUnlikePost}></i>
                    ) : (
                      <i className="fa fa-heart-o" onClick={likeUnlikePost}></i>
                    )}
                    &nbsp;&nbsp;
                    <i
                      className="fa fa-comment-o"
                      onClick={() => history.push("/post/" + post._id)}
                    ></i>
                    &nbsp;&nbsp;
                    <i className="fa fa-paper-plane"></i> <br />
                  </div>
                  <div style={{ paddingLeft: "20px", paddingBottom: "10px" }}>
                    <b>{post.likedBy.length}</b> Likes &nbsp;
                    <b>{post.comments.length}</b> Comments
                  </div>
                  <CommentBox>
                    <div style={{ padding: "20px", fontSize: "17px" }}>😄</div>
                    <CommentInput
                      placeholder="Add a comment..."
                      onChange={(event) => setCommentText(event.target.value)}
                      value={commentText}
                    />
                    <a
                      href="#"
                      style={{
                        textDecoration: "none",
                        paddingTop: "20px",
                        cursor: "pointer",
                      }}
                      onClick={handlePostComment}
                    >
                      {postingComment ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <>Post</>
                      )}
                    </a>
                  </CommentBox>
                </BottomDiv>
              </CommentsContainer>
            </Container>
          </Wrapper>
          <br />
          <br />
        </>
      ) : (
        <Wrapper style={{ padding: "100px" }}>
          <Loading />
        </Wrapper>
      )}
    </>
  );
};

export default ViewPost;
