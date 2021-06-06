import Modal from "./Modal";
import { Header } from "./NewPost";
import { useState, useEffect } from "react";
import {
  getLoggedInUser,
  getUsersDpAndDisplayNames,
  acceptFrdRequest,
  sendFriendRequest,
  unfollowUser,
} from "../services/authService";
import Loading from "./Loading";
import styled from "styled-components";
import defaultDp from "../assets/images/default.jpg";
import {
  Container,
  CoverPic,
  NotificationMsg,
  BtnContainer,
  Btn,
} from "./Notifications";

const Follower = (props) => {
  const [btnProperties, setBtnproperties] = useState();

  useEffect(() => {
    if (props.loggedInUser.following.includes(props.follower.name))
      setBtnproperties({
        bgColor: "#fff",
        txtColor: "#00",
        text: "Following",
        onclickFunction: () => removeFromFollowing(props.follower.name),
      });
    else
      setBtnproperties({
        bgColor: "#4d79ff",
        txtColor: "#fff",
        text: "Follow",
        onclickFunction: () => followUser(props.follower.name),
      });
    // console.log(btnProperties.onclickFunction);
  }, []);

  const setLoadingIcon = () => {
    setBtnproperties((prevState) => ({
      ...prevState,
      text: <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>,
    }));
  };

  const followUser = async (username) => {
    setLoadingIcon();
    var response = await sendFriendRequest(username);
    var data = response.data.request_data;
    if (data._id) {
      setBtnproperties({
        bgColor: "#fff",
        txtColor: "#000",
        text: "Sent",
        onclickFunction: () => unfollowUser(props.follower.name),
      });
    }
  };

  const removeFromFollowing = async (username) => {
    setLoadingIcon();
    var response = await unfollowUser(username);
    if (response.data.msg == "unfollowed") {
      setBtnproperties({
        bgColor: "#4d79ff",
        txtColor: "#fff",
        text: "Follow",
        onclickFunction: () => followUser(props.follower.name),
      });
    }
  };

  const CancelRequest = async (username) => {
    setLoadingIcon();
  };

  return (
    <Container>
      {btnProperties && (
        <>
          <CoverPic
            src={
              props.follower.ProfilePic ? props.follower.ProfilePic : defaultDp
            }
          />
          <NotificationMsg style={{ marginLeft: "15px" }}>
            <b>{props.follower.name}</b> <br />
            {props.follower.displayName}
          </NotificationMsg>
          <BtnContainer>
            <Btn
              bgColor={btnProperties.bgColor}
              txtColor={btnProperties.txtColor}
              onClick={btnProperties.onclickFunction}
            >
              {btnProperties.text}
            </Btn>
          </BtnContainer>
        </>
      )}
    </Container>
  );
};

const Followers = (props) => {
  const [followersDetails, setFollowersDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const followersData = await getUsersDpAndDisplayNames(props.members);
    setFollowersDetails(followersData);
    setLoading(false);
  });

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(async () => {
    var user = await getLoggedInUser();
    console.log(user);
    setLoggedInUser(user);
  }, []);

  return (
    <Modal modalId={props.ModalId} width="380px">
      <Header>
        <h3>{props.title}</h3>
      </Header>
      {loading || !loggedInUser ? (
        <Loading />
      ) : (
        followersDetails.map((follower) => (
          <Follower
            loggedInUser={loggedInUser}
            follower={follower}
            key={follower._id}
          />
        ))
      )}
    </Modal>
  );
};
export default Followers;
