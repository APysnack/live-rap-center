import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
} from './Navbar.styles';

import LogoImg from '../../images/Logo.svg';

function Navbar() {
  const { user } = useSelector((state) => state.user.userState);
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <HamburgerButton onClick={() => setExtendNavbar(!extendNavbar)}>
              &#8801;
            </HamburgerButton>
            <NavbarLink to='/'>Home</NavbarLink>
            <NavbarLink to='/leagues'>Leagues</NavbarLink>
            <NavbarLink to='/battlers'>Battlers</NavbarLink>
            <NavbarLink to='/battles'>Battles</NavbarLink>
            {user?.email ? (
              <NavbarLink to='/settings'>Settings</NavbarLink>
            ) : null}
            {user?.roles.includes('league owner') ? (
              <NavbarLink to='/league-settings' user={user}>
                League Admin
              </NavbarLink>
            ) : null}

            {user?.roles.includes('admin') ? (
              <NavbarLink to='/admin-panel'>Administrator</NavbarLink>
            ) : null}
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg} />
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to='/'>Home</NavbarLinkExtended>
          </NavbarLinkWrapper>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to='/leagues'>Leagues</NavbarLinkExtended>
          </NavbarLinkWrapper>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to='/battlers'>Battlers</NavbarLinkExtended>
          </NavbarLinkWrapper>
          {user?.email ? (
            <NavbarLinkWrapper>
              <NavbarLinkExtended to='/settings'>Settings</NavbarLinkExtended>
            </NavbarLinkWrapper>
          ) : null}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
