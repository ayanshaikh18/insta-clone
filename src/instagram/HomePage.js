import styled from "styled-components";
import Navbar from "../components/navbar";
import { useHistory, Redirect } from "react-router-dom";
import Story from "../components/stories";
import RightCol from "../components/rightCol";
import Posts from "../components/Posts";

export const Main = styled.div`
  position: relative;
  margin-top: 55px;
  display: grid;
  z-index: 0;
  grid-template-columns: 5% 50% 40% 5%;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 0% 100% 0% 0%;
  }
  @media only screen and (max-width: 900px) and (min-width: 601px) {
    grid-template-columns: 5% 100% 0% 5%;
  }
`;

export const Col = styled.div`
  padding: 20px;
`;

const MidContainer = styled.div`
  width: 100%;
  margin-left: 100px;
  @media only screen and (max-width: 900px) {
    margin-left: 0px;
  }
`;

const Home = () => {
  const history = useHistory();

  const closeDropDown = () => {
    document.getElementById("dropdown").style.display = "none";
  };

  return (
    <>
      <Navbar />
      <Main id="main" onClick={() => closeDropDown()}>
        <Col></Col>
        <Col>
          <MidContainer>
            <Story />
            <Posts />
          </MidContainer>
        </Col>
        <Col>
          <RightCol />
        </Col>
        <Col></Col>
      </Main>
    </>
  );
};

export default Home;
