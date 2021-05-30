import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import Notifications from "../components/Notifications";
import Modal from "./Modal";

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
  margin-left: 30%;
  @media only screen and (max-width: 600px) {
    margin-left: 0%;
    margin-right: 0%;
    float: left;
  }
`;

const MenuIcons = styled.i`
  padding-right: 20px;
  font-size: 25px;
`;

const DropDownMenu = styled.div`
  display: none;
  position: fixed;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #d9d9d9;
  z-index: 2;
  margin-top: 35px;
  border-radius: 10px;
  width: 470px;
  right: 15%;
  @media only screen and (max-width: 900px) {
    right: 1%;
    width : 350px;
    height : 250px;
  }
  height: 350px;
  overflow-y: scroll;
`;

const Navbar = () => {
  const toggleDropDown = () => {
    let displayStyle =
      document.getElementById("dropdown").style.display == "block"
        ? "none"
        : "block";
    document.getElementById("dropdown").style.display = displayStyle;
  };

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
        <MenuIcons className="fa fa-heart-o" onClick={() => toggleDropDown()} />
        <DropDownMenu id="dropdown">
          <Notifications />
        </DropDownMenu>
        <Link to="/profile/">
          <MenuIcons className="fa fa-user-circle"></MenuIcons>
        </Link>
        <a open-modal="myModal">
          krne baka
        </a>
        
        <Modal modalId="myModal">
          <h3>Modal header</h3>
          <hr />
          <p>Modal body</p>
        </Modal>

      </MenuOptions>
      
    </AppNavbar>
  );
};

export default Navbar;
