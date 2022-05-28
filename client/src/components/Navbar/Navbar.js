import React, { useState } from "react";

import {
  LeftContainer,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  RightContainer,
  NavbarLink,
  Logo,
  HamburgerButton,
  NavbarLinkExtended,
  NavbarLinkWrapper,
} from "./Navbar.styles";

import LogoImg from "../../images/Logo.svg";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <HamburgerButton onClick={() => setExtendNavbar(!extendNavbar)}>
              &#8801;
            </HamburgerButton>
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/create-league">Create League</NavbarLink>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg} />
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
          </NavbarLinkWrapper>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to="/create-league">
              Create League
            </NavbarLinkExtended>
          </NavbarLinkWrapper>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
