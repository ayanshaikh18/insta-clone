import styled from "styled-components";

import ayan from "../assets/images/ayan.png";
import post1 from "../assets/images/post1.jfif";
import post2 from "../assets/images/post2.jfif";
import post3 from "../assets/images/post3.jfif";
import post4 from "../assets/images/post4.jfif";
import post5 from "../assets/images/post5.jfif";
import post6 from "../assets/images/post6.jfif";
import post7 from "../assets/images/post7.jfif";
import post8 from "../assets/images/post8.jfif";
import post9 from "../assets/images/post9.jfif";
import post10 from "../assets/images/post10.jfif";

const posts = [
  { url: post1 },
  { url: post2 },
  { url: post4 },
  { url: post6 },
  { url: post3 },
  { url: post7 },
  { url: post8 },
  { url: post5 },
  { url: post9 },
  { url: ayan },
  { url: post10 },
];

const Container = styled.div`
  padding: 10px;
  margin-top: 50px;
`;

const Menu = styled.ul`
  border-top: 1px solid #d9d9d9;
  margin-top: 0px;
  padding-top: 0px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;

const MenuItem = styled.li`
  border-top: ${(props) => (props.active ? "1px solid #000" : "0px")};
  padding-left: 15px;
  padding-top: 15px;
  font-size: 13px;
  width: 65px;
  color: ${(props) => (props.active ? "#000" : "grey")};
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

const Post = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MessageBox = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const ProfileBottom = (props) => {
  return (
    <Container>
      {props.following ? (
        <>
          <Menu>
            <MenuItem active>
              <i class="fa fa-th" aria-hidden="true"></i> &nbsp; Posts{" "}
            </MenuItem>
            <MenuItem>
              <i class="fa fa-th" aria-hidden="true"></i> &nbsp;IGTV
            </MenuItem>
            <MenuItem>
              <i class="fa fa-bookmark-o" aria-hidden="true"></i> &nbsp;Saved
            </MenuItem>
            <MenuItem>
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>{" "}
              &nbsp;Tagged
            </MenuItem>
          </Menu>

          <PostsContainer>
            {props.posts.map((post) => (
              <div style={{ padding: "10px" }}>
                <Post src={post.postedImage} />{" "}
              </div>
            ))}
          </PostsContainer>
        </>
      ) : (
        <MessageBox>
          <h2>This Account is Private.</h2>
          <h3>Follow to see their posts.</h3>
        </MessageBox>
      )}
    </Container>
  );
};

export default ProfileBottom;
