import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  width: 100%;
  background-color: ${(props) => props.theme.navbarColor};
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.white};
  height: ${(props) => (props.extendNavbar ? '100vh' : '100px')};
  @media (min-width: 700px) {
    height: 80px;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: flex-end;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  text-decoration: none;
  margin: 10px;
  font-family: ${(props) => props.theme.fontFamily};

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  text-decoration: none;
  margin: 10px;
  font-family: ${(props) => props.theme.fontFamily};

  @media (min-width: 700px) {
    display: none;
  }
`;

export const Logo = styled.img`
  max-width: 150px;
  max-height: 150px;
  margin-top: 35px;
  margin-right: 50px;
  border: none;
  background: transparent;
  background-color: transparent;
  border-radius: 15px;
`;

export const HamburgerButton = styled.button`
  width: 100px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
