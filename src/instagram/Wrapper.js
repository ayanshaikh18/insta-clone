import styled from "styled-components";
import Navbar from "../components/navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Home from "./HomePage";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import useToken from "../hooks/useToken";
import { useHistory, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/authService";
import { useState, createContext, useEffect } from "react";

const Container = styled.div`
  background-color: #fafafa;
  min-height: 100%;
  min-width: 100%;
`;

export const LoginContext = createContext();
const Wrapper = () => {
  useEffect(() => {
    if (isLoggedIn()) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, []);

  const [islogin, setIslogin] = useState(false);

  return (
    <LoginContext.Provider value={{ islogin, setIslogin }}>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            <Route exact path="/">
              {islogin ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/profile/">
              {islogin ? <ProfilePage /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </LoginContext.Provider>
  );
};

export default Wrapper;
