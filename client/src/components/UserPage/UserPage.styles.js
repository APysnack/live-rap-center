import styled from 'styled-components';
import { MOBILE_VIEW_WIDTH } from '../../globalConstants';

export const UserPageContainer = styled.div`
  overflow-x: hidden;

  .link-container {
    display: flex;
    flex-direction: column;
  }

  .primary-content-container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin-bottom: 1.2em;
  }

  .user-name-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    .username {
      color: ${(props) => props.theme.primaryContrast};
    }
  }

  .logout-button {
    background-color: ${(props) => props.theme.primaryContrast};
    padding: 0.5em 4em 0.5em 4em;
    border-radius: 7px;
    font-size: 1.2em;
    color: ${(props) => props.theme.primary};
  }

  .logout-button:hover {
    background-color: ${(props) => props.theme.tertiary};
  }

  .user-content-container {
    display: flex;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
`;
