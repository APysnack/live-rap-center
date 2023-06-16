import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

const logoUrl = 'https://lrc-public-files.s3.amazonaws.com/lrc-logo-red.png';

function Navbar() {
  const { user } = useSelector((state) => state.user.userState);
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link to='/'>
            <Logo src={logoUrl} />
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <HamburgerButton onClick={() => setExtendNavbar(!extendNavbar)}>
              &#8801;
            </HamburgerButton>
            <NavbarLink to='/leagues'>Leagues</NavbarLink>
            <NavbarLink to='/battlers'>Battlers</NavbarLink>
            <NavbarLink to='/battles'>Battles</NavbarLink>
            <NavbarLink to='/events'>Events</NavbarLink>

            {user?.email ? (
              <>
                <NavbarLink to='/chat'>Chat</NavbarLink>
                <NavbarLink to='/settings'>Settings</NavbarLink>
              </>
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
          <NavbarLinkWrapper>
            <NavbarLinkExtended to='/battles'>Battles</NavbarLinkExtended>
          </NavbarLinkWrapper>
          <NavbarLinkWrapper>
            <NavbarLinkExtended to='/events'>Events</NavbarLinkExtended>
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
