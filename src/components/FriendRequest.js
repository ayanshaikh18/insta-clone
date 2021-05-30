import defaultDp from "../assets/images/default.jpg";
import { CoverPic, NotificationMsg, BtnContainer, Btn } from "./Notifications";
import { acceptFrdRequest, sendFriendRequest, unfollowUser } from "../services/authService";
import { useState, useEffect } from "react";

const FriendRequest = (props) => {
  const [reqAccepted, setReqAccepted] = useState(false);
  const [reqSent, setReqSent] = useState(false);
  const [isFollowedByLoggedInUser, setIsFollowedByLoggedInUser] =
    useState(false);

  const confirmFrdRequest = async () => {
    let response = await acceptFrdRequest(props.req.name);
    console.log(response.data);
    if (response.data.msg == "accepted") setReqAccepted(true);
  };

  const followUser = async (username) => {
    var response = await sendFriendRequest(username);
    var data = response.data.request_data;
    if (data._id) setReqSent(true);
  };

  const unfollowUserClick = async (username) => {
    var response = await unfollowUser(username);
    if (response.data.msg == "unfollowed") {
      setIsFollowedByLoggedInUser(false)
    }
  };

  useEffect(async () => {
    var loggedInUser = props.loggedInUser;
    setIsFollowedByLoggedInUser(
      loggedInUser.following.includes(props.req.name)
    );
  }, []);

  return (
    <>
      <CoverPic
        src={props.req.profilePic != null ? props.req.profilePic : defaultDp}
      />
      <NotificationMsg>
        {props.req.name}
        <br />
        {props.req.displayName}
      </NotificationMsg>
      <BtnContainer>
        {!reqAccepted ? (
          <>
            <Btn
              bgColor="#4d79ff"
              txtColor="#fff"
              onClick={() => confirmFrdRequest()}
            >
              Confirm
            </Btn>
            <Btn bgColor="#fff" txtColor="#000">
              Delete
            </Btn>
          </>
        ) : isFollowedByLoggedInUser ? (
          <Btn bgColor="#fff" txtColor="#000" onClick={()=>unfollowUserClick(props.req.name)}>
            Following
          </Btn>
        ) : !reqSent ? (
          <Btn bgColor="#4d79ff" txtColor="#fff" onClick={() => followUser(props.req.name)}>
            Follow
          </Btn>
        ) : (
          <Btn>Sent</Btn>
        )}
      </BtnContainer>
    </>
  );
};

export default FriendRequest;
