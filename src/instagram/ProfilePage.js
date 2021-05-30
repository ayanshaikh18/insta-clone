import Navbar from "../components/navbar";
import styled from "styled-components";
import ProfileTop from "../components/ProfileTop";
import Highlights from "../components/Highlights";
import ProfileBottom from "../components/ProfileBottom";
import useToken from "../hooks/useToken";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 55px;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  z-index: 0;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 0% 100% 0%;
  }
`;

const ProfilePage = () => {
  const { token, setToken } = useToken();
  const history = useHistory();

  if (!token) {
    history.push("/login");
  }

  const closeDropDown = () => {
    document.getElementById("dropdown").style.display = "none";
  };
  return (
    <>
      <Navbar />
      <Wrapper onClick={() => closeDropDown()}>
        <div></div>
        <div>
          <ProfileTop />
          <Highlights />
          <ProfileBottom />
        </div>
        <div></div>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
