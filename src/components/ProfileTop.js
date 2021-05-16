import styled from "styled-components";
import ayan from "../assets/images/ayan.png";

const Container = styled.div`
  margin-top: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 30% 45% auto;
`;

const ProfilePic = styled.img`
  margin-top: 15px;
  height: 160px;
  width: 148px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #d9d9d9;
  @media only screen and (max-width: 600px) {
    height: 100px;
    width: 95px;
  }
  @media only screen and (min-width: 601px) and (max-width: 900px) {
    height: 130px;
    width: 120px;
  }
`;

const ProfileDetailsContainer = styled.div`
  padding-left: 10px;
`;

const EditBtn = styled.button`
  font-size: 15px;
  padding: 6px;
  font-weight: 550;
  background: transparent;
  /* background-color: #fff; */
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;

const ProfileTop = () => {
  return (
    <Container>
      <ProfilePic src={ayan} />
      <ProfileDetailsContainer>
        <div>
          <h2 style={{ fontWeight: "normal" }}>
            _.ayan18 &nbsp; &nbsp;
            <EditBtn>Edit Profile</EditBtn> &nbsp;&nbsp;
            <i class="fa fa-cog" aria-hidden="true"></i>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
          <div>
            <b>10</b> posts
          </div>
          <div>
            <b>500</b> followers
          </div>
          <div>
            <b>650</b> following
          </div>
        </div>
        <br />
        <div>
          <div>
            <b>Ayan Shaikh</b>
          </div>
          <div style={{ paddingTop: "3px" }}>
            Grow up, Glow up, Blow up !!!{" "}
          </div>
          <div style={{ paddingTop: "3px", fontWeight: "550" }}>
            <a
              style={{ textDecoration: "none", color: "darkblue" }}
              href="https://ayanshaikh18.github.io/Portfolio"
              target="_blank"
            >
              ayanshaikh18.github.io/Portfolio
            </a>
          </div>
        </div>
        <div></div>
      </ProfileDetailsContainer>
    </Container>
  );
};

export default ProfileTop;
