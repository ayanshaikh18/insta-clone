import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import defaultDp from "../assets/images/default.jpg";
import ayan from "../assets/images/ayan.png";
import { useState, useEffect } from "react";
import { getFrdRequests, getLoggedInUser } from "../services/authService";
import FriendRequest from "./FriendRequest";
import Loading from "./Loading";

export const Container = styled.div`
  padding: 15px;
  display: grid;
  cursor: pointer;
  grid-template-columns: ${(props) =>
    props.isFrdReq ? "10% 50% auto" : "10% 73% 17%"}; ;
`;

export const CoverPic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export const Hr = styled.div`
  height: 0;
  border-bottom: 1px solid #d9d9d9;
`;

const Heading = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  color: grey;
  font-size: 13px;
  font-weight: bold;
`;

export const NotificationMsg = styled.div`
  /* margin-top: 10px; */
  padding-left: 10px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

export const BtnContainer = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
`;

export const Btn = styled.button`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.txtColor};
  border: 1px solid #d9d9d9;
  height: 30px;
  border-radius: 5px;
  margin-left: 7px;
  min-width: 70px;
  cursor: pointer;
`;

const Notifications = () => {
  const [viewingFrdRequests, setViewingFrdRequests] = useState(false);
  const [frdRequests, setFrdRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(async () => {
    var user = await getLoggedInUser();
    setLoggedInUser(user);
  }, []);

  const showFrdRequests = async () => {
    setViewingFrdRequests(true);
    let requests = await getFrdRequests();
    setFrdRequests(requests);
  };

  return (
    <>
      {viewingFrdRequests ? (
        <>
          {!frdRequests ? (
            <Loading />
          ) : (
            frdRequests.map((req) => (
              <>
                <Container isFrdReq="true" key={req._id}>
                  <FriendRequest req={req} loggedInUser={loggedInUser} />
                </Container>
                <Hr />
              </>
            ))
          )}
        </>
      ) : (
        <>
          <Container onClick={() => showFrdRequests()}>
            <CoverPic src={pic1} />
            <NotificationMsg>
              <b style={{ fontWeight: "550", fontSize: "14px" }}>
                Follow Requests
              </b>{" "}
              <br />
              <small style={{ color: "grey", padding: "0" }}>
                user1 + 100 others
              </small>
            </NotificationMsg>
          </Container>
          <Hr />
          <Heading>
            <b>Today</b>
          </Heading>
          <Container>
            <CoverPic src={pic2} />
            <NotificationMsg>cric.memes started follwing you.</NotificationMsg>
            <button
              style={{
                backgroundColor: "#fff",
                border: "1px solid #d9d9d9",
                height: "30px",
                borderRadius: "5px",
              }}
            >
              Following
            </button>
          </Container>
          <Hr />
          <Heading>
            <b>This Week</b>
          </Heading>
          <Container>
            <CoverPic src={ayan} />
            <NotificationMsg>
              @jwalit21 mentioned you in comment : Thank you bro👍
            </NotificationMsg>
            <img src={pic1} height="40px" width="40px" />
          </Container>
          <Container>
            <CoverPic src={ayan} />
            <NotificationMsg>
              @jwalit21 liked your comment : Nice Pic bro✌️
            </NotificationMsg>
            <img src={pic1} height="40px" width="40px" />
          </Container>
          <Container>
            <CoverPic src={pic2} />
            <NotificationMsg>user1 started follwing you.</NotificationMsg>
            <button
              style={{
                backgroundColor: "#4d79ff",
                color: "#fff",
                border: "1px solid #d9d9d9",
                height: "30px",
                borderRadius: "5px",
              }}
            >
              Follow
            </button>
          </Container>
        </>
      )}
    </>
  );
};

export default Notifications;
