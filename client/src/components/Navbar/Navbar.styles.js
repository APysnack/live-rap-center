import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MOBILE_VIEW_WIDTH } from '../../globalConstants';

export const NavbarContainer = styled.nav`
  width: 100%;
  background-color: ${(props) => props.theme.navbarColor};
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
  height: ${(props) => (props.extendNavbar ? null : '100px')};

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    justify-content: flex-start;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 92%;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 50%;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 8%;
  justify-content: flex-start;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 50%;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
`;

export const NavbarLinkContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    justify-content: flex-end;
  }
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-weight: 600;
  text-decoration: none;
  margin: 10px;
  font-family: ${(props) => props.theme.fontFamily};

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  text-decoration: none;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.6em 0 0.6em 0;
  font-family: ${(props) => props.theme.fontFamily};
  &:hover {
    background-color: ${(props) => props.theme.tertiary} !important;
  }

  @media (min-width: ${MOBILE_VIEW_WIDTH}) {
    display: none;
  }
`;

export const Logo = styled.img`
  max-width: 150px;
  max-height: 150px;
  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    margin-top: 1em;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-right: 0.3em;
  font-size: 4em;
  user-select: none;
  cursor: pointer;

  @media (min-width: ${MOBILE_VIEW_WIDTH}) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: ${MOBILE_VIEW_WIDTH}) {
    display: none;
  }
`;
