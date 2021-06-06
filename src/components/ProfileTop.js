import styled from "styled-components";
import ayan from "../assets/images/ayan.png";
import defaultDp from "../assets/images/default.jpg";
import Followers from "./Followers-Following";

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

const ProfileTop = (props) => {
  return (
    <Container>
      <ProfilePic
        src={props.user.ProfilePic ? props.user.ProfilePic : defaultDp}
      />
      <ProfileDetailsContainer>
        <div>
          <h2 style={{ fontWeight: "normal" }}>
            {props.user.name} &nbsp; &nbsp;
            <EditBtn>Edit Profile</EditBtn> &nbsp;&nbsp;
            {/* <i class="fa fa-cog" aria-hidden="true"></i> */}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
          <div>
            <b>{props.postsCnt}</b> posts
          </div>
          <div style={{ cursor: "pointer" }} open-modal="FollowersModal">
            <b>{props.user.followers.length}</b> followers
            <Followers ModalId="FollowersModal" title="Followers" members={props.user.followers}/>
          </div>
          <div style={{ cursor: "pointer" }} open-modal="FollowingModal">
            <b>{props.user.following.length}</b> following
            <Followers ModalId="FollowingModal" title="Following" members={props.user.following}/>
          </div>
        </div>
        <br />
        <div>
          <div>
            <b>{props.user.displayName}</b>
          </div>
          <div style={{ paddingTop: "3px" }}>{props.user.bio}</div>
          <div style={{ paddingTop: "3px", fontWeight: "550" }}>
            <a
              style={{ textDecoration: "none", color: "darkblue" }}
              href={props.user.website}
              target="_blank"
            >
              {props.user.website}
            </a>
          </div>
        </div>
        <div></div>
      </ProfileDetailsContainer>
    </Container>
  );
};

export default ProfileTop;
