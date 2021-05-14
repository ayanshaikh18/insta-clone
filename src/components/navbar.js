import styled from "styled-components";
import logo from "../assets/images/logo.png";

const AppNavbar = styled.nav`
  background-color: #ffffff;
  overflow: hidden;
  border-bottom: 1px solid #d9d9d9;
  top: 0;
  position: fixed;
  width: 100%;
  justify-content: space-around;
`;

const Logo = styled.a`
  margin-left: 15%;
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
    margin-left: 0;
  }
`;

const SearchInput = styled.input`
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  text-align: center;
  width: 210px;
  height: 30px;
  margin-left: 220px;
`;

const MenuOptions = styled.ul`
  float: right;
  margin-right: 15%;
  display: flex;
  flex-direction: row;
`;

const MenuIcons = styled.i`
    padding-right  : 20px;
    font-size : 25px;
`;

const Navbar = () => {
  return (
    <AppNavbar>
      <Logo>
        <img src={logo} />
        <SearchInput placeholder="🔍&nbsp;Search" type="search"/>
      </Logo>
      <MenuOptions>
        <MenuIcons className="fa fa-home"/>
        <MenuIcons className="fa fa-paper-plane-o"/>
        <MenuIcons className="fa fa-compass"/>
        <MenuIcons className="fa fa-heart-o"/>
        <MenuIcons className="fa fa-user-circle"/>
      </MenuOptions>
    </AppNavbar>
  );
};

export default Navbar;
