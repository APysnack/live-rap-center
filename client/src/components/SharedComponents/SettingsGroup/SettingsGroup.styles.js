import styled from 'styled-components';
import { MOBILE_VIEW_WIDTH } from '../../../globalConstants';

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 100%;
    height: auto !important;
    min-height: auto !important;
  }

  .header {
    display: flex;
    background-color: ${(props) => props.theme.secondary};
    justify-content: space-evenly;
    align-items: center;
    border-radius: 6px;
    font-size: 0.9em;
    padding: 0.3em 0em 0.3em 0em;
    border: 2px solid black;
    font-size: 2em;
    font-weight: 500;
    margin-top: 0.4em;

    color: ${(props) => props.theme.fontColor};

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      font-size: 1.5em;
      width: 90% !important;
    }
  }

  .settings-content {
    margin-top: 0.8em;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.7em;
    height: auto !important;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      width: 100%;
    }

    .subheading {
      font-size: 1.2em;
      color: ${(props) => props.theme.primaryContrast};
    }

    .divider {
      background-color: ${(props) => props.theme.primaryContrast};
      opacity: 0.8;
      width: 27vw;
      height: 2px;
      margin: 1em;
    }

    .form-width-control {
      width: 75%;
    }

    .form-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: ${(props) => props.theme.formBackground};
      border-radius: 10px;
      padding: 0.5em 1.4em 1.4em 1.4em;

      select {
        margin: 0.4em;
        width: 20em;
      }

      @media (max-width: ${MOBILE_VIEW_WIDTH}) {
        width: 95% !important;
      }
    }
  }

  select {
    width: 100%;
    background-color: ${(props) => props.theme.primaryContrast};
    color: ${(props) => props.theme.primary};
  }
`;
