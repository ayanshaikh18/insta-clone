import styled from "styled-components";
import defaultDp from "../assets/images/default.webp";
import pic1 from "../assets/images/pic1.jpeg";
import { useEffect, useState } from "react";
import { getSuggestions, sendFriendRequest } from "../services/authService";

const Container = styled.div`
  padding: 15px;
  width: 300px;
  margin-left: 70px;
  position: fixed;
  z-index: 0;
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.first ? "75px 130px auto" : "55px 150px auto"};
  margin-bottom: ${(props) => (props.first ? "0px" : "15px")};
`;

const ProfilePic = styled.img`
  margin: 0px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #d9d9d9;
`;

const NameContainer = styled.div`
  position: relative;
  top: 10%;
  margin-left: 0px;
  padding: 2px;
  font-size: 15px;
`;

const Footer = styled.footer`
  color: grey;
  margin-top: 30px;
  font-size: 15px;
`;

const Profile = (props) => {
  const [reqSent, setReqSent] = useState(false);

  const followUser = async (username, node) => {
    var response = await sendFriendRequest(username);
    console.log(node);
    var data = response.data.request_data;
    if (data._id) setReqSent(true);
  };

  return (
    <ProfileContainer first={props.first}>
      <ProfilePic src={props.pic} width={props.width} height={props.height} />
      <NameContainer>
        <b>{props.username}</b> <br />
        {props.name}
      </NameContainer>
      <NameContainer style={{ color: "blue", top: "20%" }}>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => followUser(props.username, this)}
        >
          {reqSent ? "Request Sent" : props.text}
        </a>
      </NameContainer>
    </ProfileContainer>
  );
};

const RightCol = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    retriveSuggestions();
  }, []);

  const retriveSuggestions = async () => {
    var response = await getSuggestions();
    var suggestions = response.data;
    console.log(suggestions);
    setSuggestions(suggestions);
  };

  return (
    <Container>
      <Profile
        text="switch"
        pic={pic1}
        username="_.ayan18"
        name="Ayan Shaikh"
        height="60"
        width="60"
        first="true"
      />
      <br />
      <h4 style={{ color: "grey" }}>Suggestions For You</h4>

      {!suggestions ? (
        <h3>Nothing To Show</h3>
      ) : (
        suggestions.map((suggestion) => (
          <Profile
            text="follow"
            pic={
              suggestion.profilePic == null ? suggestion.profilePic : defaultDp
            }
            username={suggestion.name}
            name={suggestion.displayName}
            height="35"
            width="35"
            key={suggestion._id}
          />
        ))
      )}

      <Footer>© - Mahammadayan Shaikh</Footer>
    </Container>
  );
};

export default RightCol;
