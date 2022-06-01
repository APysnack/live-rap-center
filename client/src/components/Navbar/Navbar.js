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
            <NavbarLink to="/leagues">Leagues</NavbarLink>
            <NavbarLink to="/battles">Battles</NavbarLink>
            <NavbarLink to="/battlers">Battlers</NavbarLink>
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
            <NavbarLinkExtended to="/leagues">Leagues</NavbarLinkExtended>
          </NavbarLinkWrapper>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to="/battlers">Battlers</NavbarLinkExtended>
          </NavbarLinkWrapper>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
