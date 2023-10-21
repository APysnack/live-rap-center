import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useViewType from '../../utils/useViewType';

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
  const viewType = useViewType();

  useEffect(() => {
    if (viewType === 'desktop') {
      setExtendNavbar(false);
    }
  }, [viewType]);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link onClick={() => setExtendNavbar(false)} to='/'>
            <Logo src={logoUrl} />
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <HamburgerButton onClick={() => setExtendNavbar(!extendNavbar)}>
              &#8801;
            </HamburgerButton>
            <NavbarLink to='/leagues'>Leagues</NavbarLink>
            <NavbarLink to='/battlers'>Battlers Change</NavbarLink>
            <NavbarLink to='/battles'>Battles</NavbarLink>

            {user?.email ? (
              <>
                <NavbarLink to='/chat'>Chat</NavbarLink>
              </>
            ) : null}
            <NavbarLink to='/events'>Events</NavbarLink>

            {user?.email ? (
              <>
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
          <NavbarLinkExtended
            onClick={() => setExtendNavbar(false)}
            to='/leagues'
          >
            Leagues
          </NavbarLinkExtended>
          <NavbarLinkExtended
            onClick={() => setExtendNavbar(false)}
            to='/battlers'
          >
            Battlers
          </NavbarLinkExtended>
          <NavbarLinkExtended
            onClick={() => setExtendNavbar(false)}
            to='/battles'
          >
            Battles
          </NavbarLinkExtended>
          {user?.email ? (
            <NavbarLinkExtended
              onClick={() => setExtendNavbar(false)}
              to='/chat'
            >
              Chat
            </NavbarLinkExtended>
          ) : null}

          <NavbarLinkExtended
            onClick={() => setExtendNavbar(false)}
            to='/events'
          >
            Events
          </NavbarLinkExtended>

          {user?.email ? (
            <NavbarLinkExtended
              onClick={() => setExtendNavbar(false)}
              to='/settings'
            >
              Settings
            </NavbarLinkExtended>
          ) : null}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
