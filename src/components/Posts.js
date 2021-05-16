import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";

const posts = [
  {
    url: pic1,
    username: "jwalit21",
    caption: "Yes, it's better than drugs. Jeremy! 🥰",
    profilePic: pic3,
    uploadTime: "53m ago",
  },
  {
    url: pic2,
    username: "viratkohli",
    caption: "",
    profilePic: pic1,
    uploadTime: "53m ago",
  },
  {
    url: ayan,
    username: "_.ayan18",
    caption: "",
    profilePic: pic2,
    uploadTime: "10m ago",
  },
  {
    url: pic2,
    username: "shahid2002",
    caption: "",
    profilePic: ayan,
    uploadTime: "16h ago",
  },
  {
    url: ayan,
    username: "mahi7781",
    caption: "",
    profilePic: ayan,
    uploadTime: "21h ago",
  },
  {
    url: pic1,
    username: "rohit.sharma",
    caption: "",
    profilePic: pic3,
    uploadTime: "1h ago",
  },
];

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
  return (
    <div>
      {posts.map((post) => (
        <PostCard>
          <PostHeader>
            <div>
              <img
                height="35"
                width="35"
                style={{ borderRadius: "50%" }}
                src={post.profilePic}
              />
            </div>
            <div style={{ paddingTop: "10px" }}>{post.username}</div>
          </PostHeader>
          <PostImage src={post.url} />
          <PostBottom>
            <div style={{ fontSize: "25px" }}>
              <i className="fa fa-heart-o"></i> &nbsp;
              <i className="fa fa-comment-o"></i> &nbsp;
              <i className="fa fa-paper-plane"></i> <br />
            </div>
            <div style={{ paddingTop: "10px", fontSize: "15px" }}>
              <b>{post.username}</b> &nbsp;
              {post.caption} <br />
              {post.uploadTime}
            </div>
          </PostBottom>
          <CommentBox>
            <div style={{ padding: "20px",fontSize:"17px" }}>😄</div>
            <CommentInput placeholder="Add a comment..." />
            <a href="#" style={{ textDecoration: "none", padding: "20px" }}>
              Post
            </a>
          </CommentBox>
        </PostCard>
      ))}
    </div>
  );
};

export default Posts;
