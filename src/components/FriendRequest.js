import defaultDp from "../assets/images/default.jpg";
import { CoverPic, NotificationMsg, BtnContainer, Btn } from "./Notifications";

const FriendRequest = (props) => {
  return (
    <>
      <CoverPic src={props.req.profilePic != null ? props.req.profilePic : defaultDp} />
      <NotificationMsg>
        {props.req.name}
        <br />
        {props.req.displayName}
      </NotificationMsg>
      <BtnContainer>
        <Btn bgColor="#4d79ff" txtColor="#fff">
          Confirm
        </Btn>
        <Btn bgColor="#fff" txtColor="#000">
          Delete
        </Btn>
      </BtnContainer>
    </>
  );
};

export default FriendRequest;
