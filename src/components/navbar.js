import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";

const AppNavbar = styled.nav`
  background-color: #ffffff;
  overflow: hidden !important;
  border-bottom: 1px solid #d9d9d9;
  top: 0;
  position: fixed;
  width: 100%;
  justify-content: space-around;
  z-index: 1;
  display: grid;
  grid-template-columns: 60% 20% 20%;
`;

const Logo = styled.a`
  margin-left: 25%;
  float: left;
  text-align: center;
  padding: 12px 16px 1px;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  font-family: cursive;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    margin-left: 40%;
  }
`;

const SearchInput = styled.input`
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  height: 30px;
  margin-left: 40%;
  @media only screen and (max-width: 600px) {
    visibility: hidden;
  }
`;

const MenuOptions = styled.ul`
  float: right;
  margin-right: 15%;
  display: flex;
  flex-direction: row;
`;

const MenuIcons = styled.i`
  padding-right: 20px;
  font-size: 25px;
`;

const Navbar = () => {
  return (
    <AppNavbar>
      <Logo>
        <img src={logo} />
        <SearchInput placeholder="🔍&nbsp;Search" type="search" />
      </Logo>
      <MenuOptions>
        <Link to="/">
          <MenuIcons className="fa fa-home" />
        </Link>
        <MenuIcons className="fa fa-paper-plane-o" />
        <MenuIcons className="fa fa-compass" />
        <MenuIcons className="fa fa-heart-o" />
        <Link to="/profile/">
          <MenuIcons className="fa fa-user-circle"></MenuIcons>
        </Link>
      </MenuOptions>
    </AppNavbar>
  );
};

export default Navbar;
