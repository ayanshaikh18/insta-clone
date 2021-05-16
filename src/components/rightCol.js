import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";

const Container = styled.div`
  padding: 15px;
  width: 300px;
  margin-left: 70px;
  position: fixed;
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
  margin-top : 30px;
  font-size : 15px;
`;

const Profile = (props) => {
  return (
    <ProfileContainer first={props.first}>
      <ProfilePic src={props.pic} width={props.width} height={props.height} />
      <NameContainer>
        <b>{props.username}</b> <br />
        {props.name}
      </NameContainer>
      <NameContainer style={{ color: "blue", top: "20%" }}>
        {props.text}
      </NameContainer>
    </ProfileContainer>
  );
};

const RightCol = () => {
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
      <Profile
        text="follow"
        pic={ayan}
        username="jwalit21"
        name="Jwalit Shah"
        height="35"
        width="35"
      />
      <Profile
        text="follow"
        pic={pic2}
        username="viratkohli18"
        name="Virat Kohli"
        height="35"
        width="35"
      />
      <Profile
        text="follow"
        pic={pic1}
        username="shahid21"
        name="Shahid Shaikh"
        height="35"
        width="35"
      />
      <Profile
        text="follow"
        pic={pic3}
        username="utsavshekh"
        name="Utsav Shekh"
        height="35"
        width="35"
      />

      <Footer>© - Mahammadayan Shaikh</Footer>
    </Container>
  );
};

export default RightCol;
