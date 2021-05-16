import styled from "styled-components";
import Navbar from "../components/navbar";
import Story from "../components/stories";
import RightCol from "../components/rightCol";
import Posts from "../components/Posts";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProfilePage from "./ProfilePage";

const Container = styled.div`
  background-color: #fafafa;
  min-height: 100%;
`;

const Main = styled.div`
  margin-top: 55px;
  display: grid;
  grid-template-columns: 5% 50% 40% 5%;
  z-index: 0;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 0% 100% 0% 0%;
  }
  @media only screen and (max-width: 900px) and (min-width: 601px) {
    grid-template-columns: 5% 100% 0% 5%;
  }
`;

const Col = styled.div`
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
  return (
    <Main>
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
  );
};

const Wrapper = () => {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile/">
            <ProfilePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default Wrapper;
