import "font-awesome/css/font-awesome.min.css";
import { useState, createContext, useEffect } from "react";
import Home from "./instagram/HomePage";
import ProfilePage from "./instagram/ProfilePage";
import Login from "./instagram/Login";
import Signup from "./instagram/Signup";
import { Switch, Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./services/authService";
import styled from "styled-components";
import ViewPost from "./components/ViewPost";

const Container = styled.div`
  background-color: #fafafa;
  min-height: 100%;
  min-width: 100%;
`;

export const MyLoginContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(isLoggedIn());

  useEffect(() => {
    if (isLoggedIn() == true) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <Container>
      <MyLoginContext.Provider value={{ isLogin, setIsLogin }}>
        <Switch>
          <Route exact={true} path="/">
            {isLogin ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact={true} path="/login">
            {isLogin ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact={true} path="/signup">
            {isLogin ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact={true} path="/profile/:username">
            {isLogin ? <ProfilePage /> : <Redirect to="/login" />}
          </Route>
          <Route exact={true} path="/post/:postId">
            {isLogin ? <ViewPost /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </MyLoginContext.Provider>
    </Container>
  );
}

export default App;
