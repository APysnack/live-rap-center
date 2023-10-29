import styled from 'styled-components';
import { MOBILE_VIEW_WIDTH } from '../../globalConstants';

export const UserSettingsPageContainer = styled.div`
  display: flex;
  align-items: center;

  .content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100vw;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      flex-direction: column;
    }
  }

  .cc-wrapper {
    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }
  }

  .name-and-photo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1em;
    width: 100%;
    height: 100%;
    gap: 1em;

    .username-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 1em;
      width: 100%;
      height: 100%;
    }

    .username {
      margin-top: 1em;
      font-size: 1.4em;
      font-weight: 700;
    }

    .role {
      background-color: ${(props) => props.theme.backgroundColor};
      border: 1px solid rgba(0, 0, 0, 0.8);
      width: 15em;
      border-radius: 5px;
      font-size: 0.5em;
      text-align: center;
      color: ${(props) => props.theme.fontColor};
    }

    .roles-grid {
      margin-bottom: 1em;
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5em;
    }
  }
`;
