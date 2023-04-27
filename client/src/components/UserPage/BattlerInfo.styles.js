import styled from 'styled-components';

export const HomeLeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .league-chat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .league-chat-text {
    margin-top: 2em;
    margin-bottom: -2em;
    font-weight: 600;
    color: ${(props) => props.theme.fontColor};
    letter-spacing: 1em;
    font-size: 0.2em;
  }
`;

export const BattlerInfoContainer = styled.div`
  background-color: ${(props) => props.theme.formBackground};
  padding: 1em;
  border-radius: 10px;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .horizontal-line {
    color: black;
    height: 2px;
    width: 100%;
    margin: 1em 0 1em 0;
    background-color: black;
  }

  .battler-page-button {
    width: 100%;
    background-color: ${(props) => props.theme.primaryContrast};
    color: ${(props) => props.theme.primary};
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 5px;
    margin-top: 1em;
    align-items: center;
    text-align: center;
  }

  .battler-page-button:hover {
    background-color: ${(props) => props.theme.tertiary};
  }
`;
