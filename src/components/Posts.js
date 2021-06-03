import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { getPosts } from "../services/postService";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";

import post1 from "../assets/images/post3.jfif";
import mahi from "../assets/images/MAhi.jfif";
import rohit from "../assets/images/Rohit.jfif";
import jwalit from "../assets/images/Jwalit.jfif";
import jwalit1 from "../assets/images/Jwalit1.jfif";
import saloni from "../assets/images/Saloni.jfif";
import shahid from "../assets/images/Shahid.jfif";
import anushka from "../assets/images/anushka.jpeg";
import { getLoggedInUser } from "../services/authService";

// const posts = [
//   {
//     url: jwalit,
//     username: "jwalit21",
//     caption: "All this hustle and bustle makes me feel exhilarated!!!",
//     profilePic: jwalit,
//     uploadTime: "53m ago",
//   },
//   {
//     url: pic2,
//     username: "viratkohli",
//     caption: "Yes, it's better than drugs. Jeremy! 🥰",
//     profilePic: pic1,
//     uploadTime: "53m ago",
//   },
//   {
//     url: post1,
//     username: "_.ayan18",
//     caption: "Smile is the preetiest thing you can wear. ",
//     profilePic: pic2,
//     uploadTime: "10m ago",
//   },
//   {
//     url: shahid,
//     username: "shahid2002",
//     caption: "",
//     profilePic: shahid,
//     uploadTime: "16h ago",
//   },
//   {
//     url: mahi,
//     username: "mahi7781",
//     caption: "🏆🏆🏆",
//     profilePic: mahi,
//     uploadTime: "21h ago",
//   },
//   {
//     url: rohit,
//     username: "rohit.sharma",
//     caption: "",
//     profilePic: rohit,
//     uploadTime: "1h ago",
//   },
//   {
//     url: anushka,
//     username: "Anushka.Sharma",
//     caption: "",
//     profilePic: anushka,
//     uploadTime: "1h ago",
//   },
// ];

const PostCard = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const PostHeader = styled.div`
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 10% 90%;
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
  const [posts, setPosts] = useState();

  useEffect(async () => {
    var posts = await getPosts();
    setPosts(posts);
  }, []);

  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(async () => {
    var user = await getLoggedInUser();
    console.log(user);
    setLoggedInUser(user);
  }, []);

  return (
    <div>
      {posts ? (
        <>
          {posts.map((post) => (
            <PostCard>
              {/* <PostHeader>
                <div>
                  <img
                    height="35"
                    width="35"
                    style={{ borderRadius: "50%" }}
                    src={post.profilePic}
                  />
                </div>
                <div style={{ paddingTop: "10px" }}>{post.username}</div>
              </PostHeader> */}
              <PostImage src={post.postedImage} />
              <PostBottom>
                <div style={{ fontSize: "25px" }}>
                  <i className="fa fa-heart-o"></i> &nbsp;
                  <i className="fa fa-comment-o"></i> &nbsp;
                  <i className="fa fa-paper-plane"></i> <br />
                </div>
                <div style={{ paddingTop: "10px", fontSize: "15px" }}>
                  <b>{post.postedBy}</b> &nbsp;
                  {post.caption} <br />
                  10m ago
                </div>
              </PostBottom>
              <CommentBox>
                <div style={{ padding: "20px", fontSize: "17px" }}>😄</div>
                <CommentInput placeholder="Add a comment..." />
                <a href="#" style={{ textDecoration: "none", padding: "20px" }}>
                  Post
                </a>
              </CommentBox>
            </PostCard>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Posts;
