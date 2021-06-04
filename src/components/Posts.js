import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { getPosts } from "../services/postService";
import defaultDp from "../assets/images/default.jpg";
import InfiniteScroll from "react-infinite-scroll-component";

import { getLoggedInUser } from "../services/authService";

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

const CommentBox = styled.div`
  border-top: 1px solid #d9d9d9;
  display: grid;
  grid-template-columns: 10% 80% 10%;
`;

const CommentInput = styled.input`
  padding: 20px;
  border: 0px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postCounter, setPostCounter] = useState(0);
  const [hasMorePosts, setMorePosts] = useState(true);

  useEffect(async () => {
    var posts = await getPosts();
    setPosts(posts);
    setLoading(false);
  }, []);

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

  const loadFunc = async () => {
    let curCnt = postCounter;
    setPostCounter(curCnt + 10);
    var newPosts = await getPosts(curCnt + 10);
    console.log(newPosts);
    if (newPosts.length == 0) {
      setMorePosts(false);
    } else {
      setMorePosts(true);
      setPosts(posts.concat(newPosts));
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
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
              <PostCard key={post._id}>
                <PostHeader>
                  <div>
                    <img
                      height="40"
                      width="40"
                      style={{ borderRadius: "50%" }}
                      src={
                        post.postedBy.profilePic == null
                          ? defaultDp
                          : post.postedBy.profilePic
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
                    {post.postedBy.name}
                  </div>
                </PostHeader>
                <PostImage src={post.postedImage} />
                <PostBottom>
                  <div style={{ fontSize: "25px" }}>
                    <i className="fa fa-heart-o"></i> &nbsp;
                    <i className="fa fa-comment-o"></i> &nbsp;
                    <i className="fa fa-paper-plane"></i> <br />
                  </div>
                  <div style={{ paddingTop: "10px", fontSize: "15px" }}>
                    <b>{post.postedBy.name}</b> &nbsp;
                    {post.caption} <br />
                    {convertDate(post.time)}
                  </div>
                </PostBottom>
                <CommentBox>
                  <div style={{ padding: "20px", fontSize: "17px" }}>😄</div>
                  <CommentInput placeholder="Add a comment..." />
                  <a
                    href="#"
                    style={{ textDecoration: "none", padding: "20px" }}
                  >
                    Post
                  </a>
                </CommentBox>
              </PostCard>
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
