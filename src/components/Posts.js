import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { getPosts, likePost, postComment } from "../services/postService";
import defaultDp from "../assets/images/default.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";
import { getLoggedInUser } from "../services/authService";
import { useHistory } from "react-router";

const PostCard = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const PostHeader = styled.div`
  padding: 10px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-content: center;
`;

const PostImage = styled.img`
  width: 100%;
`;

const PostBottom = styled.div`
  padding: 10px;
`;

export const CommentBox = styled.div`
  border-top: 1px solid #d9d9d9;
  display: grid;
  grid-template-columns: 10% 80% 10%;
`;

export const CommentInput = styled.input`
  padding-left: 20px;
  border: 0px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const Post = (props) => {
  const [commentText, setCommentText] = useState();
  const [firstComment, setFirstComment] = useState();
  const [postingComment, setPostingComment] = useState(false);
  const history = useHistory();

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
    const data = await likePost(props.post._id);
    const msg = data.msg;
    if (msg == "Post Unliked") {
      element.classList.add("fa-heart-o");
      element.classList.remove("fa-heart");
    } else {
      element.classList.add("fa-heart");
      element.classList.remove("fa-heart-o");
    }
  };

  const handlePostComment = async (event) => {
    event.preventDefault();
    setPostingComment(true);
    const comment = {
      commentBy: props.loggedInUser.name,
      commentText: commentText,
    };
    const data = await postComment(props.post._id, comment);
    setFirstComment({
      commentBy: props.loggedInUser.name,
      commentText: commentText,
    });
    setCommentText("");
    setPostingComment(false);
  };

  return (
    <PostCard>
      <PostHeader>
        <div>
          <img
            height="40"
            width="40"
            style={{ borderRadius: "50%" }}
            src={
              props.post.postedBy.profilePic == null
                ? defaultDp
                : props.post.postedBy.profilePic
            }
          />
        </div>
        <div
          style={{
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.post.postedBy.name}
        </div>
      </PostHeader>
      <PostImage src={props.post.postedImage} />
      <PostBottom>
        <div style={{ fontSize: "25px" }}>
          {props.post.likedBy.includes(props.loggedInUser.name) ? (
            <i className="fa fa-heart" onClick={likeUnlikePost}></i>
          ) : (
            <i className="fa fa-heart-o" onClick={likeUnlikePost}></i>
          )}{" "}
          &nbsp;
          <i
            className="fa fa-comment-o"
            onClick={() => history.push("/post/" + props.post._id)}
          ></i>{" "}
          &nbsp;
          <i className="fa fa-paper-plane"></i> <br />
        </div>
        <div style={{ paddingTop: "10px", fontSize: "15px" }}>
          <b>{props.post.postedBy.name}</b> &nbsp;
          {props.post.caption} <br />
          {convertDate(props.post.time)}
        </div>
        {firstComment && (
          <div>
            <b>{firstComment.commentBy}</b> &nbsp; {firstComment.commentText}
          </div>
        )}
      </PostBottom>
      <CommentBox>
        <div style={{ padding: "20px", fontSize: "17px" }}>😄</div>
        <CommentInput
          placeholder="Add a comment..."
          onChange={(event) => setCommentText(event.target.value)}
          value={commentText}
        />
        <a
          href="#"
          style={{ textDecoration: "none", padding: "20px", cursor: "pointer" }}
          onClick={handlePostComment}
        >
          {postingComment ? (
            <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          ) : (
            <>Post</>
          )}
        </a>
      </CommentBox>
    </PostCard>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postCounter, setPostCounter] = useState(0);
  const [hasMorePosts, setMorePosts] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(async () => {
    var posts = await getPosts();
    setPosts(posts);
    setLoading(false);
  }, []);

  useEffect(async () => {
    var user = await getLoggedInUser();
    setLoggedInUser(user);
  }, []);

  const loadFunc = async () => {
    let curCnt = postCounter;
    setPostCounter(curCnt + 10);
    var newPosts = await getPosts(curCnt + 10);
    if (newPosts.length == 0) {
      setMorePosts(false);
    } else {
      setMorePosts(true);
      setPosts(posts.concat(newPosts));
    }
  };

  return (
    <>
      {!loading && loggedInUser ? (
        <>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadFunc}
            hasMore={hasMorePosts}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts.map((post) => (
              <Post post={post} key={post._id} loggedInUser={loggedInUser} />
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Posts;
